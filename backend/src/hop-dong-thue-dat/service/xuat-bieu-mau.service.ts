import { BadRequestException, Injectable } from "@nestjs/common";
import * as ExcelJS from 'exceljs';
import * as fs from 'fs';
import * as path from 'path';
import { bangTheoDoi } from "../constants/headers-xuat-excel";
import { HopDongThueDatService } from "./hop-dong-thue-dat.service";

@Injectable()
export class XuatBieuMauHopDongService {
    constructor(
        private hopDongService: HopDongThueDatService,
    ) { }
    async xuatBangTheoDoi(targetDir: string) {
        const map = await this.hopDongService.getHopDongThueDatWithOlder({ 'hopDongDate': 'desc' });
        console.log(map);
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Bảng theo dõi');

        // 1. Định dạng chung cho cột (độ rộng)
        worksheet.columns = bangTheoDoi.map((value) => {
            return { width: value.width }
        });

        // 2. Tiêu đề công ty
        const companyCell = worksheet.getCell('A1');
        companyCell.value = 'Công ty cổ phần nhiệt điện Quảng Ninh';
        companyCell.font = { bold: true, size: 12 };

        // 3. Tiêu đề bảng (Merge và Center)
        worksheet.mergeCells('A3:L3');
        const titleCell = worksheet.getCell('A3');
        titleCell.value = 'Bảng theo dõi các hợp đồng thuê đất';
        titleCell.font = { bold: true, size: 14 };
        titleCell.alignment = { vertical: 'middle', horizontal: 'center' };

        // 4. Thiết lập Header (Dòng 5)
        // Lưu ý: exceljs tính index từ 1
        const headerRow = worksheet.getRow(5);
        headerRow.values = bangTheoDoi.map(value => value.header);
        headerRow.font = { bold: true };
        headerRow.alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
        headerRow.height = 60; // Tăng chiều cao để hiện đủ chữ
        // Đổ viền cho header
        headerRow.eachCell((cell) => {
            cell.border = {
                top: { style: 'thin' },
                left: { style: 'thin' },
                bottom: { style: 'thin' },
                right: { style: 'thin' }
            };
        });

        // 5. Thêm dữ liệu mẫu (Dòng 6)
        const row6 = worksheet.addRow([
            '1',
            'Hợp đồng số 181/HĐTD ngày 23/11/2023',
            '',
            'm2',
            '2,701,539.40',
            '40 năm kể từ ngày 15/3/2007',
            'Sử dụng làm khu bãi thải xỉ; khu hệ thống kênh dẫn nước làm mát...',
            'Cao Xanh',
            '10000',
            '',
            'Đơn giá ổn định 5 năm/1 lần (từ ngày 24/9/2023 đến 24/9/2028)',
            'GNC quyền sở hữu'
        ]);

        // Format dữ liệu trong bảng
        row6.eachCell((cell) => {
            cell.alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
            cell.border = {
                top: { style: 'thin' },
                left: { style: 'thin' },
                bottom: { style: 'thin' },
                right: { style: 'thin' }
            };
        });
        this.writeFileExcel(workbook, targetDir, "bangtheodoi.xlsx");
    }

    private async writeFileExcel(workbook: ExcelJS.Workbook, targetDir: string, fileName: string) {
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
