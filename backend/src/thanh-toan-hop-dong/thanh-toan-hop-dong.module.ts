import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ThanhToanHopDongEntity } from "./entity/thanh-toan-hop-dong.entity";
import { ThanhToanHopDongService } from "./service/thanh-toan-hop-dong.service";
import { ThanhToanHopDongController } from "./controller/thanh-toan-hop-dong.controller";

@Module({
    imports: [
        TypeOrmModule.forFeature([ThanhToanHopDongEntity]),
    ],
    providers: [
        ThanhToanHopDongService,
    ],
    controllers: [
        ThanhToanHopDongController,
    ],
    exports: [
        ThanhToanHopDongService,
    ]
})
export class ThanhToanHopDongModule { }