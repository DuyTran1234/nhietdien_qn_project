import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { HopDongThueDatEntity } from "./entity/hop-dong-thue-dat.entity";
import { HopDongThueDatService } from "./service/hop-dong-thue-dat.service";
import { HopDongThueDatController } from "./controller/hop-dong-thue-dat.controller";
import { ThanhToanHopDongModule } from "src/thanh-toan-hop-dong/thanh-toan-hop-dong.module";
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
})
export class HopDongThueDatModule { }