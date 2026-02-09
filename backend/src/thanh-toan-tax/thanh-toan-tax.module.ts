import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ThanhToanTaxEntity } from "./entity/thanh-toan-tax.entity";
import { ThanhToanTaxService } from "./service/thanh-toan-tax.service";
import { ThanhToanTaxController } from "./controller/thanh-toan-tax.controller";

@Module({
    imports: [
        TypeOrmModule.forFeature([ThanhToanTaxEntity]),
    ],
    providers: [
        ThanhToanTaxService,
    ],
    controllers: [
        ThanhToanTaxController,
    ],
    exports: [
        ThanhToanTaxService,
    ],
})
export class ThanhToanTaxModule { }