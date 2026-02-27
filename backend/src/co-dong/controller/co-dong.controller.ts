import { Body, Controller, Delete, Get, Param, ParseBoolPipe, ParseIntPipe, Patch, Post, Query, UploadedFile, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { PATH_STORAGE } from "src/constant/common";
import { CoDongResponseDto } from "../dto/response/co-dong.response.dto";
import { DanhSachCoDongService } from "../service/danh-sach-co-dong.service";
import { CreateCoDongDto } from "../dto/request/create-co-dong.request.dto";
import { CoDongService } from "../service/co-dong.service";
import { UpdateCoDongRequestDto } from "../dto/request/update-co-dong.request.dto";

@Controller('co-dong')
export class CoDongController {
    constructor(
        private danhSachCoDongService: DanhSachCoDongService,
        private coDongService: CoDongService,
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

    @Post('create-co-dong')
    async createCoDong(@Body() createDto: CreateCoDongDto): Promise<CoDongResponseDto> {
        return await this.coDongService.createCoDong(createDto);
    }

    @Get('get-co-dong/:id')
    async getCoDongById(@Param('id', ParseIntPipe) id: number): Promise<CoDongResponseDto> {
        return await this.coDongService.getCoDongById(id);
    }

    @Get('get-pagination-co-dong')
    async getPaginationCoDong(
        @Body() sortDto: any,
        @Query('limit', new ParseIntPipe({ optional: true })) limit: number,
        @Query('page', new ParseIntPipe({ optional: true })) page: number,
        @Query('searchCoDong') searchCoDong: string,
        @Query('filterCoDongLon', new ParseBoolPipe({ optional: true })) filterCoDongLon: boolean,
        @Query('filterType', new ParseIntPipe({ optional: true })) filterType: number,
        @Query('filterCntc', new ParseIntPipe({ optional: true })) filterCntc: number,
    ) {
        return await this.danhSachCoDongService.getPaginationCoDong(
            sortDto, limit, page, searchCoDong, filterCoDongLon, filterType, filterCntc
        );
    }

    @Patch('update-co-dong')
    async updateCoDong(@Body() updateDto: UpdateCoDongRequestDto): Promise<CoDongResponseDto> {
        return await this.coDongService.updateCoDong(updateDto);
    }

    @Delete('delete-co-dong/:id')
    async deleteCoDongById(@Param('id', ParseIntPipe) id: number) {
        return await this.coDongService.deleteCoDongById(id);
    }
}