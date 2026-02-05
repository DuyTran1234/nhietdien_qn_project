import { Controller, Get, Query } from "@nestjs/common";
import { BangTheoDoiService } from "../service/bang-theo-doi.service";

@Controller('xuat-bieu-mau-hop-dong')
export class BieuMauHopDongController {
    constructor(
        private bangTheoDoiService: BangTheoDoiService,
    ) { }

    @Get('bang-theo-doi')
    async bangTheoDoi(@Query('targetDir') targetDir: string) {
        return await this.bangTheoDoiService.xuatBangTheoDoi(targetDir);
    }
}