import { Injectable } from "@nestjs/common";
import dayjs from "dayjs";
import * as ExcelJS from 'exceljs';
import { HopDongThueDatEntity } from "src/hop-dong-thue-dat/entity/hop-dong-thue-dat.entity";
import { HopDongThueDatService } from "src/hop-dong-thue-dat/service/hop-dong-thue-dat.service";
import { headersKeHoachNopTienThueDat } from "../constants/headers-ke-hoach-nop-tien-thue-dat";
import { FileExcelService } from "./file-excel.service";

@Injectable()
export class KeHoachNopTienThueDatService {
    constructor(
        private hopDongService: HopDongThueDatService,
        private fileService: FileExcelService,
    ) { }

    private monthUsed(newest: HopDongThueDatEntity, older: HopDongThueDatEntity): number[] {
        const now = dayjs();
        const apDungDonGiaDateNewest = dayjs(newest.apDungDonGiaDate);
        const endDate = dayjs(newest.endDate);
        const totalUsedMonth =
            endDate.year() === now.year() ? endDate.month() + 1 - (endDate.date() >= 15 ? 0 : 1) : 12;
        if (!older && apDungDonGiaDateNewest.year() === now.year()) {
            const monthSkipped =
                apDungDonGiaDateNewest.month() + 1 - (apDungDonGiaDateNewest.date() >= 15 ? 0 : 1);
            return [totalUsedMonth - monthSkipped];
        } else if (older && apDungDonGiaDateNewest.year() === now.year()) {
            const olderMonthUsed =
                apDungDonGiaDateNewest.month() + 1 - (apDungDonGiaDateNewest.date() >= 15 ? 0 : 1);
            const newestMonthUsed = totalUsedMonth - olderMonthUsed;
            return [newestMonthUsed, olderMonthUsed];
        } else {
            return [totalUsedMonth];
        }
    }

    async xuatKeHoachNopTienThueDat() {
        const [mapHopDong, total] =
            await this.hopDongService.getHopDongThueDatWithOlder({ 'apDungDonGiaDate': 'desc' });
        const now = dayjs();
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Lập kế hoạch thuê đất');
        worksheet.columns = headersKeHoachNopTienThueDat.map((value) => {
            return {
                key: value.key,
                width: value.width,
                style: value?.style,
            };
        });

        worksheet.mergeCells('A1:C1');
        const companyCell = worksheet.getCell('A1');
        companyCell.value = 'CÔNG TY CỔ PHẦN NHIỆT ĐIỆN QUẢNG NINH';
        companyCell.font = { bold: true, size: 12 };

        worksheet.mergeCells('A4:H4');
        const titleCell = worksheet.getCell('A4');
        titleCell.value = `KẾ HOẠCH NỘP TIỀN THUÊ ĐẤT NĂM ${now.year()}`;
        titleCell.font = { bold: true, size: 12 };
        titleCell.alignment = { vertical: 'middle', horizontal: 'center' };

        const headersRow = worksheet.getRow(6);
        headersRow.values = headersKeHoachNopTienThueDat.map(value => value.header);
        headersRow.font = { bold: true, size: 12 };
        headersRow.alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
        headersRow.height = 60;
        headersRow.eachCell((cell) => {
            cell.border = {
                top: { style: 'thin' },
                left: { style: 'thin' },
                bottom: { style: 'thin' },
                right: { style: 'thin' }
            };
        });
        let index = 1;
        let sumTongTien = 0;
        for (const listHopDong of mapHopDong.values()) {
            const listUsedMonth = this.monthUsed(listHopDong[0], listHopDong[1] ?? null);
            for (let i = 0; i < listUsedMonth.length; ++i) {
                const Hd = listHopDong[i];
                const tongTien = Math.round(Hd.dienTich * Hd.donGiaThue * listUsedMonth[i] / 12);
                sumTongTien += tongTien;
                const row = worksheet.addRow({
                    stt: i > 0 ? `${index}.${i}` : `${index}`,
                    mucDichThue: Hd.mucDichThue,
                    soHopDong: `Hợp đồng số ${Hd.soHopDong} ngày ${dayjs(Hd.hopDongDate).format('DD/MM/YYYY')}`,
                    dienTich: Hd.dienTich,
                    donGia: Hd.donGiaThue,
                    soThangSuDung: listUsedMonth[i],
                    tongTien: tongTien,
                    ghiChu: Hd.ghiChu ?? '',
                });
                row.height = 30;
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
            }
            ++index;
        }
        const summaryRow = worksheet.addRow({
            stt: '',
            mucDichThue: 'Tổng cộng',
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

        return await this.fileService.writeFileExcel(workbook, `lap_ke_hoach_thue_dat_${now.year()}.xlsx`);
    }
}