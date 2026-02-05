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

    async xuatBangTinhTienKy(soKy: number) {
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
        headersRow.height = 80
    }
}