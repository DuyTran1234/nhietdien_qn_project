import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CoTucEntity } from "./entity/co-tuc.entity";
import { ChiTietCoTucEntity } from "./entity/chi-tiet-co-tuc.entity";
import { CoTucService } from "./service/co-tuc.service";
import { CoTucController } from "./controller/co-tuc.controller";
import { DanhSachToTucService } from "./service/danh-sach-co-tuc.service";
import { ChiTietCoTucService } from "src/co-tuc/service/chi-tiet-co-tuc.service";
import { ChiTietCoTucController } from "./controller/chi-tiet-co-tuc.controller";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            CoTucEntity,
            ChiTietCoTucEntity,
        ]),
    ],
    providers: [
        CoTucService,
        DanhSachToTucService,
        ChiTietCoTucService,
    ],
    controllers: [
        CoTucController,
        ChiTietCoTucController,
    ],
})
export class CoTucModule { }