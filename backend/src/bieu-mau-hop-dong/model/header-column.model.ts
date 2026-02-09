import * as ExcelJS from "exceljs";

export class HeaderColumn {
    constructor({ header, key, width, style }: any) {
        this.header = header;
        this.key = key;
        this.width = width;
        this.style = style ?? {};
    }

    header: string;
    key: string;
    width: number;
    style: Partial<ExcelJS.Style>
}