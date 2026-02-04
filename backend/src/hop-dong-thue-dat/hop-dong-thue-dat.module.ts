import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ThanhToanHopDongModule } from "src/thanh-toan-hop-dong/thanh-toan-hop-dong.module";
import { HopDongThueDatController } from "./controller/hop-dong-thue-dat.controller";
import { HopDongThueDatEntity } from "./entity/hop-dong-thue-dat.entity";
import { HopDongThueDatService } from "./service/hop-dong-thue-dat.service";
import { KyThanhToanService } from "./service/ky-thanh-toan.service";
import { XuatBieuMauHopDongService } from "./service/xuat-bieu-mau.service";
import { XuatBieuMauHopDongController } from "./controller/xuat-bieu-mau.controller";

@Module({
    imports: [
        TypeOrmModule.forFeature([HopDongThueDatEntity]),
        ThanhToanHopDongModule,
    ],
    providers: [
        HopDongThueDatService,
        KyThanhToanService,
        XuatBieuMauHopDongService,
    ],
    controllers: [
        HopDongThueDatController,
        XuatBieuMauHopDongController,
    ],
})
export class HopDongThueDatModule { }