import { Module } from "@nestjs/common";
import { BieuMauHopDongController } from "./controller/bieu-mau-hop-dong.controller";
import { BangTheoDoiService } from "./service/bang-theo-doi.service";
import { HopDongThueDatModule } from "src/hop-dong-thue-dat/hop-dong-thue-dat.module";
import { FileExcelService } from "./service/file-excel.service";
import { BangTinhTienKyService } from "./service/bang-tinh-tien-ky.service";
import { KeHoachNopTienThueDatService } from "./service/ke-hoach-nop-tien-thue-dat.service";

@Module({
    imports: [
        HopDongThueDatModule,
    ],
    providers: [
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