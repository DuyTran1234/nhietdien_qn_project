import { Injectable } from "@nestjs/common";
import dayjs from "dayjs";
import { HopDongThueDatService } from "src/hop-dong-thue-dat/service/hop-dong-thue-dat.service";
import { headersBangTinhTienKy1, headersBangTinhTienKy2 } from "../constants/headers-bang-tinh-tien-ky";
import { FileExcelService } from "./file-excel.service";
import { HeaderFormService } from "./header-form.service";

@Injectable()
export class BangTinhTienKyService {
    constructor(
        private hopDongService: HopDongThueDatService,
        private fileService: FileExcelService,
        private headerFormService: HeaderFormService,
    ) { }

    async xuatBangTinhTienKy(
        soKy: number
    ): Promise<{ message: string, path: string, fileName: string }> {
        const formatSoKy = soKy === 1 ? 'I' : 'II';
        const headers = soKy === 1 ? headersBangTinhTienKy1 : headersBangTinhTienKy2;
        const [listHopDong, total] =
            await this.hopDongService.getPaginationHopDongThueDat({ 'apDungDonGiaDate': 'desc' });
        const now = dayjs();
        const { workbook, worksheet } = this.headerFormService.createHeaderForm(
            `Bảng tính tiền thuê đất kỳ ${formatSoKy}`,
            `BẢNG TÍNH TIỀN THUÊ ĐẤT PHẢI NỘP KỲ ${formatSoKy} NĂM ${now.year()}`,
            headers,
        );
        let totalYear = 0, tongTienKy = 0, tongDaThanhToan = 0;
        for (let i = 0; i < listHopDong.length; ++i) {
            const hopDong = listHopDong[i];
            const totalYearHopDong =
                hopDong.chiTietCacKy.reduce((sum, hopDong) => hopDong.tongSoTien + sum, 0);
            totalYear += totalYearHopDong;
            tongTienKy += hopDong.chiTietCacKy[soKy - 1].tongSoTien;
            tongDaThanhToan += hopDong.chiTietCacKy[soKy - 1].daThanhToan;
            const row = worksheet.addRow({
                stt: i + 1,
                viTriThue: hopDong.viTriThue,
                dienTich: hopDong.dienTich,
                donGia: hopDong.donGiaThue,
                tongTien: totalYearHopDong,
                tienKy: hopDong.chiTietCacKy[soKy - 1].tongSoTien,
                daThanhToan: hopDong.chiTietCacKy[soKy - 1].daThanhToan,
                canThanhToan: hopDong.chiTietCacKy[soKy - 1].tongSoTien - hopDong.chiTietCacKy[soKy - 1].daThanhToan,
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
            viTriThue: 'Tổng tiền',
            dienTich: '',
            donGia: '',
            tongTien: totalYear,
            tienKy: tongTienKy,
            daThanhToan: tongDaThanhToan,
            canThanhToan: tongTienKy - tongDaThanhToan,
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
        worksheet.addRow({ viTriThue: 'Bằng chữ: ........' });
        worksheet.addRow([]); worksheet.addRow([]);
        const lastRow = worksheet.addRow([]);
        lastRow.getCell('B').value = 'Người lập';
        lastRow.getCell('E').value = 'Kế toán trưởng';
        lastRow.getCell('H').value = 'Tổng giám đốc';

        return await
            this.fileService.writeFileExcel(workbook, `bang_tinh_tien_ky_${formatSoKy}_${now.year()}.xlsx`);
    }
}