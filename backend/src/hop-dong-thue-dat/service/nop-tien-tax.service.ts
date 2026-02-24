import { Injectable } from "@nestjs/common";
import dayjs from "dayjs";
import { ThanhToanTaxService } from "src/thanh-toan-tax/service/thanh-toan-tax.service";
import { ChiTietNopTaxResponseDto } from "../dto/response/chi-tiet-nop-tax.response.dto";
import { ChiTietSuDungResponseDto } from "../dto/response/chi-tiet-su-dung.response.dto";
import { HopDongThueDatEntity } from "../entity/hop-dong-thue-dat.entity";

@Injectable()
export class NopTienTaxService {
    constructor(
        private thanhToanTaxService: ThanhToanTaxService,
    ) { }

    async nopTienTaxPnn(
        newest: HopDongThueDatEntity, older: HopDongThueDatEntity | null,
        chiTietSuDung: ChiTietSuDungResponseDto
    ): Promise<ChiTietNopTaxResponseDto> {
        const now = dayjs();
        const listThanhToan = await this.thanhToanTaxService.getThanhToanTaxByHopDongUUID(
            newest.hopDongUUID, now.year(), { 'ngayThanhToan': 'desc' },
        )
        let sumThanhToan = 0;
        for (const thanhToan of listThanhToan) {
            sumThanhToan += thanhToan.tienThanhToan;
        }
        const { newestMonthUsed, olderMonthUsed } = chiTietSuDung;
        return {
            newestAmount: this.tinhTienNopTax(
                newest.dienTich, newest.giaPnn, newest.thueSuat.tax, newestMonthUsed
            ),
            olderAmount: older ? this.tinhTienNopTax(
                older.dienTich, older.giaPnn, older.thueSuat.tax, olderMonthUsed
            ) : 0,
            daThanhToan: sumThanhToan,
        };
    }

    private tinhTienNopTax(dienTich: number, giaPnn: number, thueSuat: number, monthUsed: number): number {
        const total = dienTich * giaPnn * (thueSuat / 100) * monthUsed;
        return Math.round(total / 12);
    }
}