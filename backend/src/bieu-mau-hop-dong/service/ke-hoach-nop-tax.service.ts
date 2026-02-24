import { Injectable } from "@nestjs/common";
import dayjs from "dayjs";
import * as ExcelJS from "exceljs";
import { HopDongThueDatDtoResponse } from "src/hop-dong-thue-dat/dto/response/hop-dong-thue-dat.dto.response";
import { HopDongThueDatService } from "src/hop-dong-thue-dat/service/hop-dong-thue-dat.service";
import { headersKeHoachNopTax } from "../constants/headers-ke-hoach-nop-tax";
import { FileExcelService } from "./file-excel.service";
import { HeaderFormService } from "./header-form.service";

@Injectable()
export class KeHoachNopTaxService {
    constructor(
        private fileService: FileExcelService,
        private formService: HeaderFormService,
        private hopDongService: HopDongThueDatService,
    ) { }

    tinhToanHopDong(
        worksheet: ExcelJS.Worksheet, stt: string,
        hopDong: HopDongThueDatDtoResponse, isNewestFlag: boolean
    ): number {
        if (!hopDong) {
            return 0;
        }
        const monthUsed = isNewestFlag ? hopDong.chiTietSuDung.newestMonthUsed :
            hopDong.chiTietSuDung.olderMonthUsed;
        const tongTien = isNewestFlag ? hopDong.chiTietNopTax.newestAmount :
            hopDong.chiTietNopTax.olderAmount;
        const row = worksheet.addRow({
            stt: stt,
            viTriThue: hopDong.viTriThue,
            soHopDong:
                `Hợp đồng số ${hopDong.soHopDong} ngày ${dayjs(hopDong.hopDongDate).format('DD/MM/YYYY')}`,
            dienTich: hopDong.dienTich,
            donGia: hopDong.giaPnn,
            thueSuat: hopDong.thueSuat.tax,
            soThangSuDung: monthUsed,
            tongTien: tongTien,
            ghiChu: hopDong.ghiChu ?? '',
        });
        row.height = 35;
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
        return tongTien;
    }

    async xuatKeHoachNopTax(): Promise<{ message: string, path: string, fileName: string }> {
        const [listHopDong, total] = await this.hopDongService.getPaginationHopDongThueDat();
        const now = dayjs();
        const { workbook, worksheet } = this.formService.createHeaderForm(
            'Lập kế hoạch thuê đất',
            `KẾ HOẠCH NỘP TIỀN THUẾ SỬ DỤNG ĐẤT PHI NÔNG NGHIỆP NĂM ${now.year()}`,
            headersKeHoachNopTax
        );
        let index = 1;
        for (const hopDong of listHopDong) {
            this.tinhToanHopDong(worksheet, `${index}`, hopDong, true);
            if (hopDong.olderHopDong && hopDong.chiTietSuDung.olderMonthUsed > 0) {
                this.tinhToanHopDong(worksheet, `${index}.1`, hopDong, false);
            }
            ++index;
        }
        worksheet.addRow({ viTriThue: 'Bằng chữ: ........' });
        worksheet.addRow([]); worksheet.addRow([]);
        const lastRow = worksheet.addRow([]);
        lastRow.getCell('B').value = 'Người lập';
        lastRow.getCell('F').value = 'Phòng Tài chính và kế toán';

        return await this.fileService.writeFileExcel(
            workbook,
            `ke_hoach_nop_tien_thue_dat_phi_nong_nghiep_${now.year()}.xlsx`,
        );
    }
}