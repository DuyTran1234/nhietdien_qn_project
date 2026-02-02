import { Module } from "@nestjs/common";
import { ThueSuatDatService } from "./service/thue-suat-dat.service";
import { ThueSuatDatController } from "./controller/thue-suat-dat.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ThueSuatDatEntity } from "./entity/thue-suat-dat.entity";


@Module({
    imports: [
        TypeOrmModule.forFeature([ThueSuatDatEntity]),
    ],
    providers: [
        ThueSuatDatService,
    ],
    controllers: [
        ThueSuatDatController,
    ],
    exports: [],
})
export class ThueSuatDatModule { }