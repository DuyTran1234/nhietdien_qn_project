import { Injectable } from "@nestjs/common";
import dayjs from "dayjs";
import * as ExcelJS from 'exceljs';
import { HopDongThueDatDtoResponse } from "src/hop-dong-thue-dat/dto/response/hop-dong-thue-dat.dto.response";
import { HopDongThueDatService } from "src/hop-dong-thue-dat/service/hop-dong-thue-dat.service";
import { KyThanhToanService } from "src/hop-dong-thue-dat/service/ky-thanh-toan.service";
import { headersKeHoachNopTienThueDat } from "../constants/headers-ke-hoach-nop-tien-thue-dat";
import { FileExcelService } from "./file-excel.service";
import { HeaderFormService } from "./header-form.service";

@Injectable()
export class KeHoachNopTienThueDatService {
    constructor(
        private hopDongService: HopDongThueDatService,
        private fileService: FileExcelService,
        private headerFormService: HeaderFormService,
    ) { }

    private tinhToanHopDong(
        worksheet: ExcelJS.Worksheet, stt: string, hopDong: HopDongThueDatDtoResponse,
        isNewestFlag: boolean,
    ): number {
        if (!hopDong) {
            return 0;
        }
        const monthUsed =
            isNewestFlag ? hopDong.chiTietSuDung.newestMonthUsed : hopDong.chiTietSuDung.olderMonthUsed;
        const tongTien = Math.round(hopDong.dienTich * hopDong.donGiaThue * monthUsed / 12);
        const row = worksheet.addRow({
            stt: stt,
            viTriThue: hopDong.viTriThue,
            soHopDong: `Hợp đồng số ${hopDong.soHopDong} ngày ${dayjs(hopDong.hopDongDate).format('DD/MM/YYYY')}`,
            dienTich: hopDong.dienTich,
            donGia: hopDong.donGiaThue,
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

    async xuatKeHoachNopTienThueDat() {
        const [listHopDong, total] =
            await this.hopDongService.getPaginationHopDongThueDat({ 'apDungDonGiaDate': 'desc' });
        const now = dayjs();
        const { workbook, worksheet } =
            this.headerFormService.createHeaderForm(
                'Lập kế hoạch thuê đất', `KẾ HOẠCH NỘP TIỀN THUÊ ĐẤT NĂM ${now.year()}`,
                headersKeHoachNopTienThueDat,
            );
        let index = 1;
        let sumTongTien = 0;
        for (const hopDong of listHopDong) {
            sumTongTien += this.tinhToanHopDong(worksheet, `${index}`, hopDong, true);
            if (hopDong.olderHopDong && hopDong.chiTietSuDung.olderMonthUsed > 0) {
                sumTongTien += this.tinhToanHopDong(worksheet, `${index}.1`, hopDong.olderHopDong, false);
            }
            ++index;
        }
        const summaryRow = worksheet.addRow({
            stt: '',
            viTriThue: 'Tổng cộng',
            soHopDong: '',
            dienTich: '',
            donGia: '',
            soThangSuDung: '',
            tongTien: sumTongTien,
            ghiChu: '',
        });
        summaryRow.font = { bold: true, size: 12 };
        summaryRow.height = 30;
        summaryRow.eachCell((cell) => {
            cell.alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
            cell.border = {
                top: { style: 'thin' },
                left: { style: 'thin' },
                bottom: { style: 'thin' },
                right: { style: 'thin' }
            };
        });
        worksheet.addRow([]).getCell('B').value = 'Bằng chữ: .....';
        worksheet.addRow([]); worksheet.addRow([]);
        const totalRow = worksheet.addRow([]);
        totalRow.getCell('B').value = 'Người lập';
        totalRow.getCell('F').value = 'Phòng tài chính và kế toán';

        return await
            this.fileService.writeFileExcel(workbook, `lap_ke_hoach_thue_dat_${now.year()}.xlsx`);
    }
}