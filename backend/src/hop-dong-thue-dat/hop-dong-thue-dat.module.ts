import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ThanhToanHopDongModule } from "src/thanh-toan-hop-dong/thanh-toan-hop-dong.module";
import { HopDongThueDatController } from "./controller/hop-dong-thue-dat.controller";
import { HopDongThueDatEntity } from "./entity/hop-dong-thue-dat.entity";
import { HopDongThueDatService } from "./service/hop-dong-thue-dat.service";
import { KyThanhToanService } from "./service/ky-thanh-toan.service";
import { NopTienTaxService } from "./service/nop-tien-tax.service";
import { ThanhToanTaxModule } from "src/thanh-toan-tax/thanh-toan-tax.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([HopDongThueDatEntity]),
        ThanhToanHopDongModule,
        ThanhToanTaxModule,
    ],
    providers: [
        HopDongThueDatService,
        KyThanhToanService,
        NopTienTaxService,
    ],
    controllers: [
        HopDongThueDatController,
    ],
    exports: [
        HopDongThueDatService,
        KyThanhToanService,
        NopTienTaxService,
    ]
})
export class HopDongThueDatModule { }