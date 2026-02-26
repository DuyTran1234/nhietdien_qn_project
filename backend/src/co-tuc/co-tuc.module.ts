import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CoTucEntity } from "./entity/co-tuc.entity";
import { ChiTietCoTucEntity } from "./entity/chi-tiet-co-tuc.entity";
import { CoTucService } from "./service/co-tuc.service";
import { CoTucController } from "./controller/co-tuc.controller";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            CoTucEntity,
            ChiTietCoTucEntity,
        ]),
    ],
    providers: [
        CoTucService,
    ],
    controllers: [
        CoTucController,
    ],
})
export class CoTucModule { }