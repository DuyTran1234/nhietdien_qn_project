import { Injectable } from "@nestjs/common";
import dayjs from "dayjs";
import { KyThanhToan } from "src/thanh-toan-hop-dong/enum/ky-thanh-toan.enum";
import { ThanhToanHopDongService } from "src/thanh-toan-hop-dong/service/thanh-toan-hop-dong.service";
import { ChiTietThanhToanDtoResponse } from "../dto/response/chi-tiet-thanh-toan.dto.response";
import { HopDongThueDatEntity } from "../entity/hop-dong-thue-dat.entity";

@Injectable()
export class KyThanhToanService {
    constructor(
        private thanhToanService: ThanhToanHopDongService,
    ) { }

    private isTruoc30Thang4(date: dayjs.Dayjs) {
        return date.isBefore(dayjs(`${date.year()}-04-30`));
    }

    async tinhToanTienKy(
        newest: HopDongThueDatEntity, older: HopDongThueDatEntity | null
    ): Promise<ChiTietThanhToanDtoResponse[]> {
        const hopDongEndDate = dayjs(newest.endDate);
        const dateNewest = dayjs(newest.apDungDonGiaDate);
        const now = dayjs();
        const listThanhToan = await this.thanhToanService.getThanhToanHopDongByHopDongUUID(
            newest.hopDongUUID, now.year()
        );
        let thanhToanKy1 = 0, thanhToanKy2 = 0, thanhToanKy3 = 0;
        for (const thanhToan of listThanhToan) {
            thanhToanKy1 = thanhToanKy1 + (thanhToan.ky === KyThanhToan.KyI ? thanhToan.tienThanhToan : 0);
            thanhToanKy2 = thanhToanKy2 + (thanhToan.ky === KyThanhToan.KyII ? thanhToan.tienThanhToan : 0);
            thanhToanKy3 = thanhToanKy3 + (thanhToan.ky === KyThanhToan.BoSung ? thanhToan.tienThanhToan : 0);
        }
        if (!older && dateNewest.year() === now.year()) {
            // Thời điểm mới ký hợp đồng đầu tiên
            const totalMonthUsed = now.year() === hopDongEndDate.year() ?
                hopDongEndDate.month() + 1 - (hopDongEndDate.date() >= 15 ? 0 : 1) : 12;
            const monthSkipped = dateNewest.month() + 1 - (dateNewest.date() >= 15 ? 0 : 1);
            const monthUsed = totalMonthUsed - monthSkipped;
            if (this.isTruoc30Thang4(dateNewest)) {
                const totalYear = Math.round((newest.dienTich * newest.donGiaThue * monthUsed) / 12);
                const tienKy = Math.round(totalYear / 2);
                return [
                    new ChiTietThanhToanDtoResponse(tienKy, thanhToanKy1),
                    new ChiTietThanhToanDtoResponse(tienKy, thanhToanKy2),
                ];
            } else {
                // ký mới và áp dụng từ 1/7
                const totalYear = Math.round((newest.dienTich * newest.donGiaThue * monthUsed) / 12);
                return [
                    new ChiTietThanhToanDtoResponse(0, thanhToanKy1),
                    new ChiTietThanhToanDtoResponse(totalYear, thanhToanKy2),
                ];
            }
        }
        else if (!older || dateNewest.year() < now.year()) {
            const totalMonthUsed = now.year() === hopDongEndDate.year() ?
                hopDongEndDate.month() + 1 - (hopDongEndDate.date() >= 15 ? 0 : 1) : 12;
            const totalYear = Math.round((newest.dienTich * newest.donGiaThue * totalMonthUsed) / 12);
            const tienKy = Math.round(totalYear / 2);
            return [
                new ChiTietThanhToanDtoResponse(tienKy, thanhToanKy1),
                new ChiTietThanhToanDtoResponse(tienKy, thanhToanKy2),
            ];
        } else {
            const totalMonthUsed = now.year() === hopDongEndDate.year() ?
                hopDongEndDate.month() + 1 - (hopDongEndDate.date() >= 15 ? 0 : 1) : 12;
            if (this.isTruoc30Thang4(dateNewest)) {
                // áp dụng đơn giá có đổi mới trước 30/4
                const monthUsedOlder = dateNewest.month() + 1 - (dateNewest.date() >= 15 ? 0 : 1);
                const olderThanhToan = Math.round((monthUsedOlder * older.donGiaThue * older.dienTich) / 12);
                const monthUsedNewest = totalMonthUsed - monthUsedOlder;
                const newestThanhToan = Math.round((newest.donGiaThue * newest.dienTich * monthUsedNewest) / 12);
                const tienKy = (olderThanhToan + newestThanhToan) / 2;
                return [
                    new ChiTietThanhToanDtoResponse(tienKy, thanhToanKy1),
                    new ChiTietThanhToanDtoResponse(tienKy, thanhToanKy2),
                ];
            } else {
                // áp dụng đơn giá có đổi mới từ 1/7
                const totalOlder = Math.round((older.dienTich * older.donGiaThue * totalMonthUsed) / 12);
                const tienHaiKy = Math.round(totalOlder / 2);
                const monthUsedOlder = dateNewest.month() + 1 - (dateNewest.date() >= 15 ? 0 : 1);
                const monthUsedNewest = totalMonthUsed - monthUsedOlder;
                const tienBoSung = (newest.dienTich * newest.donGiaThue * monthUsedNewest) / 12
                    - (older.dienTich * older.donGiaThue * monthUsedNewest) / 12;
                return [
                    new ChiTietThanhToanDtoResponse(tienHaiKy, thanhToanKy1),
                    new ChiTietThanhToanDtoResponse(tienHaiKy, thanhToanKy2),
                    new ChiTietThanhToanDtoResponse(tienBoSung, thanhToanKy3),
                ];
            }
        }
    }
}