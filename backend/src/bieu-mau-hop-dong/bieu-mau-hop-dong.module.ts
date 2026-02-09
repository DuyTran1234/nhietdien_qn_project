import { Module } from "@nestjs/common";
import { HopDongThueDatModule } from "src/hop-dong-thue-dat/hop-dong-thue-dat.module";
import { BieuMauHopDongController } from "./controller/bieu-mau-hop-dong.controller";
import { BangTheoDoiService } from "./service/bang-theo-doi.service";
import { BangTinhTienKyService } from "./service/bang-tinh-tien-ky.service";
import { FileExcelService } from "./service/file-excel.service";
import { HeaderFormService } from "./service/header-form.service";
import { KeHoachNopTienThueDatService } from "./service/ke-hoach-nop-tien-thue-dat.service";

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
    ],
    controllers: [
        BieuMauHopDongController,
    ],
})
export class BieuMauHopDongModule { }