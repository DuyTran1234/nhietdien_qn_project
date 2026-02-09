import { Injectable } from "@nestjs/common";
import * as ExcelJS from 'exceljs';
import { HeaderColumn } from "../model/header-column.model";

@Injectable()
export class HeaderFormService {
    constructor(

    ) { }

    createHeaderForm(
        sheetName: string, title: string, headers: HeaderColumn[],
    ): { workbook: ExcelJS.Workbook, worksheet: ExcelJS.Worksheet } {
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet(sheetName);
        // Tạo column cho worksheet
        worksheet.columns = headers.map((value) => {
            return {
                key: value.key,
                width: value.width,
                style: value?.style,
            }
        });
        // Tạo tên công ty
        worksheet.mergeCells('A1:C1');
        const companyCell = worksheet.getCell('A1');
        companyCell.value = 'CÔNG TY CỔ PHẦN NHIỆT ĐIỆN QUẢNG NINH';
        companyCell.font = { bold: true, size: 12 };
        // Tạo tiêu đề bảng
        worksheet.mergeCells(4, 1, 4, headers.length);
        const titleCell = worksheet.getCell('A4');
        titleCell.value = title;
        titleCell.font = { bold: true, size: 12 };
        titleCell.alignment = { vertical: 'middle', horizontal: 'center' };

        // Tạo header bảng
        const headerRow = worksheet.getRow(7);
        headerRow.values = headers.map(value => value.header);
        headerRow.font = { bold: true, size: 12 };
        headerRow.alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
        headerRow.height = 70;
        // Đổ viền cho header
        headerRow.eachCell((cell) => {
            cell.border = {
                top: { style: 'thin' },
                left: { style: 'thin' },
                bottom: { style: 'thin' },
                right: { style: 'thin' }
            };
        });

        return { workbook, worksheet };
    }
}