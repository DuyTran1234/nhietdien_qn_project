import { Controller, Get, Param, ParseIntPipe, Res, StreamableFile } from "@nestjs/common";
import { type Response } from "express";
import { createReadStream } from "fs";
import { BangTheoDoiService } from "../service/bang-theo-doi.service";
import { BangTinhTienKyService } from "../service/bang-tinh-tien-ky.service";
import { KeHoachNopTienThueDatService } from "../service/ke-hoach-nop-tien-thue-dat.service";

@Controller('xuat-bieu-mau-hop-dong')
export class BieuMauHopDongController {
    constructor(
        private bangTheoDoiService: BangTheoDoiService,
        private bangTinhTienKyService: BangTinhTienKyService,
        private keHoachNopTienThueService: KeHoachNopTienThueDatService,
    ) { }

    @Get('bang-theo-doi')
    async bangTheoDoi(@Res({ passthrough: true }) res: Response): Promise<StreamableFile> {
        const fileInfo = await this.bangTheoDoiService.xuatBangTheoDoi();
        const fileStream = createReadStream(fileInfo.path);
        res.set({
            'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            'Content-Disposition': `attachment; filename="${fileInfo.fileName}"`,
        });
        return new StreamableFile(fileStream);
    }

    @Get('bang-tinh-tien-ky/:soKy')
    async bangTinhTienKy(
        @Param('soKy', ParseIntPipe) soKy: number, @Res({ passthrough: true }) res: Response
    ): Promise<StreamableFile> {
        const fileInfo = await this.bangTinhTienKyService.xuatBangTinhTienKy(soKy);
        const fileStream = createReadStream(fileInfo.path);
        res.set({
            'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            'Content-Disposition': `attachment; filename="${fileInfo.fileName}"`,
        });
        return new StreamableFile(fileStream);
    }

    @Get('ke-hoach-nop-tien-thue-dat')
    async keHoachNopTienThueDat(@Res({ passthrough: true }) res: Response): Promise<StreamableFile> {
        const fileInfo = await this.keHoachNopTienThueService.xuatKeHoachNopTienThueDat();
        const fileStream = createReadStream(fileInfo.path);
        res.set({
            'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            'Content-Disposition': `attachment; filename="${fileInfo.fileName}"`,
        });
        return new StreamableFile(fileStream);
    }
}