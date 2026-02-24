import { Injectable } from "@nestjs/common";
import { FileExcelService } from "./file-excel.service";
import { HopDongThueDatService } from "src/hop-dong-thue-dat/service/hop-dong-thue-dat.service";
import { HeaderFormService } from "./header-form.service";
import dayjs from "dayjs";
import { headersBangTinhTienBoSung } from "../constants/headers-bang-tinh-tien-bo-sung";

@Injectable()
export class NopBoSungThueDatService {
    constructor(
        private fileService: FileExcelService,
        private hopDongService: HopDongThueDatService,
        private headerFormService: HeaderFormService,
    ) { }

    async xuatBangNopBoSungThueDat() {
        const now = dayjs();
        const [list, total] = await this.hopDongService.getPaginationHopDongThueDat();
        const listHopDong = list.filter((val) => val.olderHopDong && val.chiTietCacKy.length > 2);
        const { workbook, worksheet } = this.headerFormService.createHeaderForm(
            'Nộp bổ sung',
            `BẢNG TÍNH TIỀN THUÊ ĐẤT PHẢI NỘP BỔ SUNG NĂM ${now.year()}`,
            headersBangTinhTienBoSung,
        );
        let index = 1;
        let sumDienTich = 0, sumOlderTongTien = 0, sumNewestTongTien = 0, sumTienBoSung = 0;
        for (const hopDong of listHopDong) {
            const olderDonGia = hopDong.olderHopDong?.donGiaThue ?? 0;
            const newestDonGia = hopDong.donGiaThue;
            const monthUsed = hopDong.chiTietSuDung.newestMonthUsed;
            const olderTongTien = Math.round(olderDonGia * hopDong.dienTich * monthUsed / 12);
            const newestTongTien = Math.round(newestDonGia * hopDong.dienTich * monthUsed / 12);
            sumDienTich += hopDong.dienTich;
            sumOlderTongTien += olderTongTien;
            sumNewestTongTien += newestTongTien;
            sumTienBoSung += hopDong.chiTietCacKy[2].tongSoTien;
            const row = worksheet.addRow({
                stt: `${index++}`,
                viTriThue: hopDong.viTriThue,
                soHopDong: hopDong.soHopDong,
                dienTich: hopDong.dienTich,
                olderDonGia: olderDonGia,
                olderMonthUsed: monthUsed,
                olderTongTien: olderTongTien,
                newestDonGia: newestDonGia,
                newestMonthUsed: monthUsed,
                newestTongTien: newestTongTien,
                tienBoSung: hopDong.chiTietCacKy[2].tongSoTien,
                ghiChu: hopDong.ghiChu ?? '',
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
        const summaryRow = worksheet.addRow({
            stt: '',
            viTriThue: 'Tổng',
            soHopDong: '',
            dienTich: sumDienTich,
            olderDonGia: '',
            olderMonthUsed: '',
            olderTongTien: sumOlderTongTien,
            newestDonGia: '',
            newestMonthUsed: '',
            newestTongTien: sumNewestTongTien,
            tienBoSung: sumTienBoSung,
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
        totalRow.getCell('B').value = 'NGƯỜI LẬP';
        totalRow.getCell('E').value = 'KẾ TOÁN TRƯỞNG';
        totalRow.getCell('H').value = 'Q. TỔNG GIÁM ĐỐC';

        return await this.fileService.writeFileExcel(
            workbook,
            `nop_bo_sung_nam_${now.year()}.xlsx`
        );
    }
}