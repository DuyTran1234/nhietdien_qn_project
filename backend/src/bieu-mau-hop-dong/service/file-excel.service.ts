import { BadRequestException, Injectable } from "@nestjs/common";
import * as ExcelJS from 'exceljs';
import * as fs from 'fs';
import * as path from "path";
import { PATH_STORAGE } from "src/constant/common";


@Injectable()
export class FileExcelService {
    async writeFileExcel(
        workbook: ExcelJS.Workbook, fileName: string
    ): Promise<{ message: string, path: string, fileName: string }> {
        const fullPath = path.join(PATH_STORAGE, fileName);
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