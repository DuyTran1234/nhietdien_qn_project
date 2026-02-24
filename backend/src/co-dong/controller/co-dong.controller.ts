import { Body, Controller, Get, ParseIntPipe, Post, Query, UploadedFile, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { DanhSachCoDongService } from "../service/danh-sach-co-dong.service";
import { diskStorage } from "multer";
import { PATH_STORAGE } from "src/constant/common";
import * as uuid from 'uuid';
import { CoDongResponseDto } from "../dto/response/co-dong.response.dto";

@Controller('co-dong')
export class CoDongController {
    constructor(
        private danhSachCoDongService: DanhSachCoDongService,
    ) { }

    @Post('create-danh-sach-co-dong')
    @UseInterceptors(FileInterceptor('file', {
        storage: diskStorage({
            destination: PATH_STORAGE,
        }),
    }))
    async createDanhSachCoDong(@UploadedFile() file: Express.Multer.File) {
        await this.danhSachCoDongService.createDanhSachCoDong(file);
        return {
            message: "create danh sach co dong success",
        };
    }

    @Get('get-pagination-co-dong')
    async getPaginationCoDong(
        @Body() sortDto: any, @Query('limit', ParseIntPipe) limit: number,
        @Query('limit', ParseIntPipe) page: number, @Query('searchCoDong') searchCoDong: string
    ): Promise<[CoDongResponseDto[], number]> {
        return await this.danhSachCoDongService.getPaginationCoDong(sortDto, limit, page, searchCoDong);
    }
}