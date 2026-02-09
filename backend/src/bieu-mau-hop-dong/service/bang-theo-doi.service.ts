import { Injectable } from "@nestjs/common";
import dayjs from "dayjs";
import { HopDongThueDatService } from "src/hop-dong-thue-dat/service/hop-dong-thue-dat.service";
import { headersBangTheoDoi } from "../constants/headers-bang-theo-doi";
import { FileExcelService } from "./file-excel.service";
import { HeaderFormService } from "./header-form.service";

@Injectable()
export class BangTheoDoiService {
    constructor(
        private hopDongService: HopDongThueDatService,
        private fileService: FileExcelService,
        private headerFormService: HeaderFormService,
    ) { }
    async xuatBangTheoDoi(): Promise<{ message: string, path: string, fileName: string }> {
        const [map, total] = await this.hopDongService.getHopDongThueDatWithOlder({ 'hopDongDate': 'desc' });
        const now = dayjs();
        const { workbook, worksheet } = this.headerFormService.createHeaderForm(
            'Bảng theo dõi', `Bảng theo dõi các hợp đồng thuê đất năm ${now.year()}`,
            headersBangTheoDoi,
        )
        // 5. Thêm dữ liệu mẫu (Dòng 6)
        let i = 1;
        for (const list of map.values()) {
            for (let index = 0; index < list.length; ++index) {
                const hopDong = list[index];
                const row = worksheet.addRow({
                    stt: index > 0 ? `${i}.${index}` : i,
                    soHopDong: `Hợp đồng số ${hopDong.soHopDong} ngày ${dayjs(hopDong.hopDongDate).format("DD/MM/YYYY")}`,
                    quyetDinhThueDat:
                        `Quyết định thuê đất số ${hopDong.quyetDinhThueDatSo} ngày ${dayjs(hopDong.quyetDinhThueDatDate).format("DD/MM/YYYY")}`,
                    unit: 'm2',
                    dienTich: hopDong.dienTich,
                    thoiGianThue: `${hopDong.soNamThue} năm kể từ ngày ${dayjs(hopDong.batDauThue).format("DD/MM/YYYY")}`,
                    mucDichThue: hopDong.mucDichThue,
                    khuVucThue: hopDong.khuVucThue,
                    donGiaThueDat: hopDong.donGiaThue,
                    quyetDinhDonGia:
                        `Quyết định đơn giá số ${hopDong.quyetDinhDonGiaSo} ngày ${dayjs(hopDong.quyetDinhDonGiaDate).format("DD/MM/YYYY")}`,
                    onDinhDonGia:
                        `Đơn giá ổn định ${hopDong.soNamOnDinh} năm/1 lần (từ ngày ${dayjs(hopDong.onDinhDonGiaDate).format('DD/MM/YYYY')})`,
                    note: hopDong.ghiChu ?? '',
                });
                // Format dữ liệu trong bảng
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
            ++i;
        }
        // chỉnh sửa cuối file
        worksheet.addRow([]); worksheet.addRow([]);
        const lastRow = worksheet.addRow([]);
        lastRow.font = { size: 12 };
        lastRow.alignment = { horizontal: 'center' };
        lastRow.getCell('B').value = 'Người lập';
        lastRow.getCell('G').value = 'Phòng Tài chính và kế toán';

        return await this.fileService.writeFileExcel(workbook, `bang_theo_doi_${now.year()}.xlsx`);
    }
}
