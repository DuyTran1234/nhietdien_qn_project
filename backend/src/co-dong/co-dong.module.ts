import { Module } from "@nestjs/common";
import { CoDongController } from "./controller/co-dong.controller";
import { DanhSachCoDongService } from "./service/danh-sach-co-dong.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CoDongEntity } from "./entity/co-dong.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([CoDongEntity]),
    ],
    providers: [
        DanhSachCoDongService,
    ],
    controllers: [
        CoDongController,
    ],
})
export class CoDongModule { }