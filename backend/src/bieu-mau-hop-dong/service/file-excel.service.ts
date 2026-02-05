import { BadRequestException, Injectable } from "@nestjs/common";
import * as ExcelJS from 'exceljs';
import * as fs from 'fs';
import * as path from "path";


@Injectable()
export class FileExcelService {
    async writeFileExcel(
        workbook: ExcelJS.Workbook, targetDir: string, fileName: string
    ): Promise<{ message: string, path: string }> {
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