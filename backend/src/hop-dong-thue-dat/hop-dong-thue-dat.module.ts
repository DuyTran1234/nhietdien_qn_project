import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ThanhToanHopDongModule } from "src/thanh-toan-hop-dong/thanh-toan-hop-dong.module";
import { HopDongThueDatController } from "./controller/hop-dong-thue-dat.controller";
import { HopDongThueDatEntity } from "./entity/hop-dong-thue-dat.entity";
import { HopDongThueDatService } from "./service/hop-dong-thue-dat.service";
import { KyThanhToanService } from "./service/ky-thanh-toan.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([HopDongThueDatEntity]),
        ThanhToanHopDongModule,
    ],
    providers: [
        HopDongThueDatService,
        KyThanhToanService,
    ],
    controllers: [
        HopDongThueDatController,
    ],
    exports: [
        HopDongThueDatService,
        KyThanhToanService,
    ]
})
export class HopDongThueDatModule { }