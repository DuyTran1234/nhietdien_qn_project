import { BadRequestException, Injectable } from "@nestjs/common";
import * as ExcelJS from 'exceljs';
import * as path from 'path';
import * as fs from 'fs';
import { InjectRepository } from "@nestjs/typeorm";
import { HopDongThueDatEntity } from "../entity/hop-dong-thue-dat.entity";

@Injectable()
export class XuatBieuMauHopDong {
    constructor(
        
    ) { }
    async xuatBangTheoDoi() {
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Bảng theo dõi');
        worksheet.mergeCells('A1:C1');

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
