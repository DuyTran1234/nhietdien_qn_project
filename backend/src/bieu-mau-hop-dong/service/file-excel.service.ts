import { BadRequestException, Injectable } from "@nestjs/common";
import * as ExcelJS from 'exceljs';
import * as fs from 'fs';
import * as path from "path";


@Injectable()
export class FileExcelService {
    async writeFileExcel(
        workbook: ExcelJS.Workbook, fileName: string
    ): Promise<{ message: string, path: string, fileName: string }> {
        const storage = '.tmp'
        const fullPath = path.join(process.cwd(), storage, fileName);
        if (!fs.existsSync(path.dirname(fullPath))) {
            fs.mkdirSync(path.dirname(fullPath), { recursive: true });
        }
        try {
            await workbook.xlsx.writeFile(fullPath);
            return {
                message: 'Xuất file thành công!',
                path: fullPath,
                fileName: fileName,
            };
        } catch (error) {
            throw new BadRequestException('Lỗi khi lưu file');
        }
    }

}