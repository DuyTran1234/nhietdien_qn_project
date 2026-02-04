import { Controller, Get, Query } from "@nestjs/common";
import { XuatBieuMauHopDongService } from "../service/xuat-bieu-mau.service";

@Controller('xuat-bieu-mau-hop-dong')
export class XuatBieuMauHopDongController {
    constructor(
        private xuatBieuMauService: XuatBieuMauHopDongService,
    ) { }

    @Get('bang-theo-doi')
    async bangTheoDoi(@Query('targetDir') targetDir: string) {
        return await this.xuatBieuMauService.xuatBangTheoDoi(targetDir);
    }
}