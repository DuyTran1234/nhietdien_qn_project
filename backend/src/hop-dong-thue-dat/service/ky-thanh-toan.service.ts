import { Injectable } from "@nestjs/common";
import dayjs from "dayjs";
import { KyThanhToan } from "src/thanh-toan-hop-dong/enum/ky-thanh-toan.enum";
import { ThanhToanHopDongService } from "src/thanh-toan-hop-dong/service/thanh-toan-hop-dong.service";
import { ChiTietThanhToanDtoResponse } from "../dto/response/chi-tiet-thanh-toan.dto.response";
import { HopDongThueDatEntity } from "../entity/hop-dong-thue-dat.entity";
import { ChiTietSuDungResponseDto } from "../dto/response/chi-tiet-su-dung.response.dto";

@Injectable()
export class KyThanhToanService {
    constructor(
        private thanhToanService: ThanhToanHopDongService,
    ) { }

    private isTruoc30Thang4(date: dayjs.Dayjs) {
        return date.isBefore(dayjs(`${date.year()}-05-01`));
    }

    monthUsed(newest: HopDongThueDatEntity, older: HopDongThueDatEntity | null): ChiTietSuDungResponseDto {
        const now = dayjs();
        const apDungDonGiaDateNewest = dayjs(newest.apDungDonGiaDate);
        const endDate = dayjs(newest.endDate);
        const totalUsedMonth =
            endDate.year() === now.year() ? endDate.month() + 1 - (endDate.date() >= 15 ? 0 : 1) : 12;
        if (!older && apDungDonGiaDateNewest.year() === now.year()) {
            const monthSkipped =
                apDungDonGiaDateNewest.month() + 1 - (apDungDonGiaDateNewest.date() > 15 ? 0 : 1);
            return {
                newestMonthUsed: totalUsedMonth - monthSkipped,
                olderMonthUsed: 0,
            };
        } else if (older && apDungDonGiaDateNewest.year() === now.year()) {
            const olderMonthUsed =
                apDungDonGiaDateNewest.month() + 1 - (apDungDonGiaDateNewest.date() > 15 ? 0 : 1);
            const newestMonthUsed = totalUsedMonth - olderMonthUsed;
            return {
                newestMonthUsed, olderMonthUsed
            };
        } else {
            return {
                newestMonthUsed: totalUsedMonth,
                olderMonthUsed: 0,
            };
        }
    }

    async tinhToanTienKy(
        newest: HopDongThueDatEntity, older: HopDongThueDatEntity | null,
        chiTietSuDung: ChiTietSuDungResponseDto
    ): Promise<ChiTietThanhToanDtoResponse[]> {
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
        const { newestMonthUsed, olderMonthUsed } = chiTietSuDung;
        const totalMonthUsed = newestMonthUsed + olderMonthUsed;
        if (older && dateNewest.year() === now.year()) {
            if (this.isTruoc30Thang4(dateNewest)) {
                // áp dụng đơn giá có đổi mới trước 30/4
                const olderThanhToan = Math.round((olderMonthUsed * older.donGiaThue * older.dienTich) / 12);
                const newestThanhToan = Math.round((newest.donGiaThue * newest.dienTich * newestMonthUsed) / 12);
                const tienKy = Math.round((olderThanhToan + newestThanhToan) / 2);
                return [
                    new ChiTietThanhToanDtoResponse(tienKy, thanhToanKy1),
                    new ChiTietThanhToanDtoResponse(tienKy, thanhToanKy2),
                ];
            } else {
                // áp dụng đơn giá có đổi mới từ 1/7
                const totalOlder = Math.round((older.dienTich * older.donGiaThue * totalMonthUsed) / 12);
                const tienHaiKy = Math.round(totalOlder / 2);
                const tienBoSung = (newest.dienTich * newest.donGiaThue * newestMonthUsed) / 12
                    - (older.dienTich * older.donGiaThue * newestMonthUsed) / 12;
                return [
                    new ChiTietThanhToanDtoResponse(tienHaiKy, thanhToanKy1),
                    new ChiTietThanhToanDtoResponse(tienHaiKy, thanhToanKy2),
                    new ChiTietThanhToanDtoResponse(Math.round(tienBoSung), thanhToanKy3),
                ];
            }
        } else {
            const totalYear = Math.round((newest.donGiaThue * newest.dienTich * newestMonthUsed)) / 12;
            const tienKy = Math.round(totalYear / 2);
            return [
                new ChiTietThanhToanDtoResponse(tienKy, thanhToanKy1),
                new ChiTietThanhToanDtoResponse(tienKy, thanhToanKy2),
            ];
        }
    }
}