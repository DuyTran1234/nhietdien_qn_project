import { Injectable } from "@nestjs/common";
import { FileExcelService } from "./file-excel.service";
import * as ExcelJS from 'exceljs';
import dayjs from "dayjs";
import { HopDongThueDatService } from "src/hop-dong-thue-dat/service/hop-dong-thue-dat.service";
import { headersBangTinhTienKy1, headersBangTinhTienKy2 } from "../constants/headers-bang-tinh-tien-ky";

@Injectable()
export class BangTinhTienKyService {
    constructor(
        private hopDongService: HopDongThueDatService,
        private fileService: FileExcelService,
    ) { }

    async xuatBangTinhTienKy(soKy: number): Promise<{ message: string, path: string, fileName: string }> {
        const formatSoKy = soKy === 1 ? 'I' : 'II';
        const headers = soKy === 1 ? headersBangTinhTienKy1 : headersBangTinhTienKy2;
        const [listHopDong, total] =
            await this.hopDongService.getPaginationHopDongThueDat({ 'apDungDonGiaDate': 'desc' });
        const now = dayjs();
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet(`Bảng tính tiền thuê đất kỳ ${formatSoKy}`);
        // 1. Định dạng chung cho cột (độ rộng) 
        worksheet.columns = headers.map((value) => {
            return {
                key: value.key,
                width: value.width,
                style: value?.style,
            }
        });
        // 2. Tiêu đề công ty
        worksheet.mergeCells('A1:D1');
        const companyCell = worksheet.getCell('A1');
        companyCell.value = 'Công ty cổ phần nhiệt điện Quảng Ninh';
        companyCell.font = { bold: true, size: 14 };
        companyCell.alignment = { horizontal: 'center' };
        // 3. Tiêu đề bảng (Merge và Center)
        worksheet.mergeCells('A4:I4');
        const titleCell = worksheet.getCell('A4');
        titleCell.value = `Bảng tính tiền thuê đất phải nộp kỳ ${formatSoKy} năm ${now.year()}`;
        titleCell.font = { bold: true, size: 12 };
        titleCell.alignment = { vertical: 'middle', horizontal: 'center' };
        // 4. Thiết lập Header (Dòng 5)
        const headersRow = worksheet.getRow(7);
        headersRow.values = headers.map(value => value.header);
        headersRow.font = { bold: true, size: 12 };
        headersRow.alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
        headersRow.height = 80;
        // Đổ viền cho header
        headersRow.eachCell((cell) => {
            cell.border = {
                top: { style: 'thin' },
                left: { style: 'thin' },
                bottom: { style: 'thin' },
                right: { style: 'thin' }
            };
        });

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

        return await this.fileService.writeFileExcel(workbook, `bang_tinh_tien_ky_${now.year()}.xlsx`);
    }
}