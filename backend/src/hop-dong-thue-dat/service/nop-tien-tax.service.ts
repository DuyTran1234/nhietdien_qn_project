import { Injectable } from "@nestjs/common";
import { KyThanhToanService } from "./ky-thanh-toan.service";
import { HopDongThueDatEntity } from "../entity/hop-dong-thue-dat.entity";
import dayjs from "dayjs";
import { ThanhToanTaxService } from "src/thanh-toan-tax/service/thanh-toan-tax.service";

@Injectable()
export class NopTienTaxService {
    constructor(
        private kyThanhToanService: KyThanhToanService,
        private thanhToanTaxService: ThanhToanTaxService,
    ) { }

    async nopTienTaxPnn(newest: HopDongThueDatEntity, older: HopDongThueDatEntity | null) {
        const now = dayjs();
        const dateNewest = dayjs(newest.apDungDonGiaDate);
        const listThanhToan = await this.thanhToanTaxService.getThanhToanTaxByHopDongUUID(
            newest.hopDongUUID, now.year(), { 'ngayThanhToan': 'desc' },
        )
        
        const [newestMonthUsed, olderMonthUsed = 0] = this.kyThanhToanService.monthUsed(newest, older);
        const totalMonthUsed = newestMonthUsed + olderMonthUsed;
    }
}