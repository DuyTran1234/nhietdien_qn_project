import { BadRequestException, Injectable } from "@nestjs/common";
import * as ExcelJS from 'exceljs';
import * as fs from 'fs';
import * as path from 'path';
import { bangTheoDoi } from "../constants/headers-xuat-excel";

@Injectable()
export class XuatBieuMauHopDong {
    constructor(

    ) { }
    async xuatBangTheoDoi() {
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Bảng theo dõi');

        // tiêu đề công ty
        worksheet.mergeCells('A1:C1');
        const companyCell = worksheet.getCell('A1');
        companyCell.value = 'Công ty cổ phần nhiệt điện Quảng Ninh';
        companyCell.font = { bold: true, size: 14 };

        // tiêu đề bảng
        worksheet.mergeCells('A3:L3');
        const titleCell = worksheet.getCell('A3');
        titleCell.value = 'Bảng theo dõi các hợp đồng thuê đất';
        titleCell.font = { bold: true, size: 14 };
        titleCell.alignment = { vertical: 'middle', horizontal: 'center' };

        // tạo header cho bảng
        const headerRow = worksheet.getRow(5);
        headerRow.values = bangTheoDoi.map((value) => value.header);
        headerRow.font = { bold: true };
        headerRow.alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
        headerRow.height = 60;
        // Đổ viền cho header
        headerRow.eachCell((cell) => {
            cell.border = {
                top: { style: 'thin' },
                left: { style: 'thin' },
                bottom: { style: 'thin' },
                right: { style: 'thin' }
            };
        });
    }

    async writeFileExcel(workbook: ExcelJS.Workbook, targetDir: string, fileName: string) {
        const fullPath = path.join(targetDir, fileName);
        if (!fs.existsSync(targetDir)) {
            // fs.mkdirSync(targetDir, { recursive: true });
            throw new BadRequestException('wrong file path');
        }
        try {
            await workbook.xlsx.writeFile(fullPath);
            return {
                message: 'Xuất file thành công!',
                path: fullPath
            };
        } catch (error) {
            throw new BadRequestException('Lỗi khi lưu file');
        }
    }
}
