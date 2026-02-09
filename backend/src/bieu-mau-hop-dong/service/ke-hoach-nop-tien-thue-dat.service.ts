import { Injectable } from "@nestjs/common";
import dayjs from "dayjs";
import { HopDongThueDatService } from "src/hop-dong-thue-dat/service/hop-dong-thue-dat.service";
import { KyThanhToanService } from "src/hop-dong-thue-dat/service/ky-thanh-toan.service";
import { headersKeHoachNopTienThueDat } from "../constants/headers-ke-hoach-nop-tien-thue-dat";
import { FileExcelService } from "./file-excel.service";
import { HeaderFormService } from "./header-form.service";

@Injectable()
export class KeHoachNopTienThueDatService {
    constructor(
        private hopDongService: HopDongThueDatService,
        private fileService: FileExcelService,
        private kyThanhToanService: KyThanhToanService,
        private headerFormService: HeaderFormService,
    ) { }

    async xuatKeHoachNopTienThueDat() {
        const [mapHopDong, total] =
            await this.hopDongService.getHopDongThueDatWithOlder({ 'apDungDonGiaDate': 'desc' });
        const now = dayjs();
        const { workbook, worksheet } =
            this.headerFormService.createHeaderForm(
                'Lập kế hoạch thuê đất', `KẾ HOẠCH NỘP TIỀN THUÊ ĐẤT NĂM ${now.year()}`,
                headersKeHoachNopTienThueDat,
            );
        let index = 1;
        let sumTongTien = 0;
        for (const listHopDong of mapHopDong.values()) {
            const listUsedMonth = this.kyThanhToanService.monthUsed(listHopDong[0], listHopDong[1] ?? null);
            for (let i = 0; i < listUsedMonth.length; ++i) {
                const Hd = listHopDong[i];
                const tongTien = Math.round(Hd.dienTich * Hd.donGiaThue * listUsedMonth[i] / 12);
                sumTongTien += tongTien;
                const row = worksheet.addRow({
                    stt: i > 0 ? `${index}.${i}` : `${index}`,
                    mucDichThue: Hd.mucDichThue,
                    soHopDong: `Hợp đồng số ${Hd.soHopDong} ngày ${dayjs(Hd.hopDongDate).format('DD/MM/YYYY')}`,
                    dienTich: Hd.dienTich,
                    donGia: Hd.donGiaThue,
                    soThangSuDung: listUsedMonth[i],
                    tongTien: tongTien,
                    ghiChu: Hd.ghiChu ?? '',
                });
                row.height = 30;
                row.font = { size: 12 };
                row.eachCell((cell) => {
                    cell.alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
                    cell.border = {
                        top: { style: 'thin' },
                        left: { style: 'thin' },
                        bottom: { style: 'thin' },
                        right: { style: 'thin' }
                    };
                });
            }
            ++index;
        }
        const summaryRow = worksheet.addRow({
            stt: '',
            mucDichThue: 'Tổng cộng',
            soHopDong: '',
            dienTich: '',
            donGia: '',
            soThangSuDung: '',
            tongTien: sumTongTien,
            ghiChu: '',
        });
        summaryRow.font = { bold: true, size: 12 };
        summaryRow.height = 30;
        summaryRow.eachCell((cell) => {
            cell.alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
            cell.border = {
                top: { style: 'thin' },
                left: { style: 'thin' },
                bottom: { style: 'thin' },
                right: { style: 'thin' }
            };
        });
        worksheet.addRow([]).getCell('B').value = 'Bằng chữ: .....';
        worksheet.addRow([]); worksheet.addRow([]);
        const totalRow = worksheet.addRow([]);
        totalRow.getCell('B').value = 'Người lập';
        totalRow.getCell('F').value = 'Phòng tài chính và kế toán';

        return await this.fileService.writeFileExcel(workbook, `lap_ke_hoach_thue_dat_${now.year()}.xlsx`);
    }
}