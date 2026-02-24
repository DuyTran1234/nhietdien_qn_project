import { Injectable } from "@nestjs/common";
import { KeHoachNopTaxService } from "./ke-hoach-nop-tax.service";
import { FileExcelService } from "./file-excel.service";
import { HopDongThueDatService } from "src/hop-dong-thue-dat/service/hop-dong-thue-dat.service";
import { HeaderFormService } from "./header-form.service";
import dayjs from "dayjs";
import { headersBangTinhTienTax } from "../constants/headers-bang-tinh-tien-tax";

@Injectable()
export class BangTinhTienTaxService {
    constructor(
        private keHoachNopTaxService: KeHoachNopTaxService,
        private fileService: FileExcelService,
        private hopDongService: HopDongThueDatService,
        private headerFormService: HeaderFormService,
    ) { }

    async xuatBangTinhTienTax(): Promise<{ message: string, path: string, fileName: string }> {
        const now = dayjs();
        const [listHopDong, total] = await this.hopDongService.getPaginationHopDongThueDat();
        const { workbook, worksheet } = this.headerFormService.createHeaderForm(
            'Bảng tính thuế SDD PNN',
            `BẢNG TÍNH TIỀN THUẾ SỬ DỤNG ĐẤT PHẢI NỘP NĂM ${now.year()}`,
            headersBangTinhTienTax
        );
        let index = 1;
        let sumTongTien = 0;
        let sumMonthUsed = 0;
        for (const hopDong of listHopDong) {
            sumMonthUsed +=
                (hopDong.chiTietSuDung.newestMonthUsed + hopDong.chiTietSuDung.olderMonthUsed);
            sumTongTien +=
                this.keHoachNopTaxService.tinhToanHopDong(worksheet, `${index}`, hopDong, true);
            if (hopDong.olderHopDong && hopDong.chiTietSuDung.olderMonthUsed > 0) {
                sumTongTien +=
                    this.keHoachNopTaxService.tinhToanHopDong(worksheet, `${index}.1`, hopDong.olderHopDong, false);
            }
            ++index;
        }
        const summaryRow = worksheet.addRow({
            stt: '',
            viTriThue: 'Tổng tiền',
            soHopDong: '',
            dienTich: '',
            donGia: '',
            thueSuat: '',
            soThangSuDung: sumMonthUsed,
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
        totalRow.getCell('D').value = 'Kế toán trưởng';
        totalRow.getCell('G').value = 'Tổng giám đốc';

        return await this.fileService.writeFileExcel(
            workbook,
            `bang_tinh_tien_sdd_pnn_nam_${now.year()}.xlsx`
        );
    }
}