import { Module } from "@nestjs/common";
import { HopDongThueDatModule } from "src/hop-dong-thue-dat/hop-dong-thue-dat.module";
import { BieuMauHopDongController } from "./controller/bieu-mau-hop-dong.controller";
import { BangTheoDoiService } from "./service/bang-theo-doi.service";
import { BangTinhTienKyService } from "./service/bang-tinh-tien-ky.service";
import { FileExcelService } from "./service/file-excel.service";
import { HeaderFormService } from "./service/header-form.service";
import { KeHoachNopTienThueDatService } from "./service/ke-hoach-nop-tien-thue-dat.service";
import { KeHoachNopTaxService } from "./service/ke-hoach-nop-tax.service";
import { BangTinhTienTaxService } from "./service/bang-tinh-tien-tax.service";
import { NopBoSungThueDatService } from "./service/bang-nop-bo-sung-thue-dat.service";

@Module({
    imports: [
        HopDongThueDatModule,
    ],
    providers: [
        HeaderFormService,
        BangTheoDoiService,
        FileExcelService,
        BangTinhTienKyService,
        KeHoachNopTienThueDatService,
        KeHoachNopTaxService,
        BangTinhTienTaxService,
        NopBoSungThueDatService,
    ],
    controllers: [
        BieuMauHopDongController,
    ],
})
export class BieuMauHopDongModule { }