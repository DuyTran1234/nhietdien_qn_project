import { Body, Controller, Delete, Get, Param, ParseBoolPipe, ParseIntPipe, Patch, Post, Query, UploadedFile, UseInterceptors } from "@nestjs/common";
import { CreateCoTucRequestDto } from "../dto/request/create-co-tuc.request.dto";
import { CoTucService } from "../service/co-tuc.service";
import { UpdateCoTucRequestDto } from "../dto/request/update-co-tuc.request.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { PATH_STORAGE } from "src/constant/common";
import { DanhSachToTucService } from "../service/danh-sach-co-tuc.service";
import { CoTucEntity } from "../entity/co-tuc.entity";

@Controller('co-tuc')
export class CoTucController {
    constructor(
        private coTucService: CoTucService,
        private danhSachCoTucService: DanhSachToTucService,
    ) { }

    @Post('create-danh-sach-co-tuc')
    @UseInterceptors(FileInterceptor('file', {
        storage: diskStorage({
            destination: PATH_STORAGE,
        }),
    }))
    async createDanhSachCoTuc(
        @UploadedFile() file: Express.Multer.File,
        @Body('namChot', ParseIntPipe) namChot: number,
    ) {
        await this.danhSachCoTucService.createDanhSachCoTuc(file, namChot);
    }

    @Post('create-co-tuc')
    async createCoTuc(@Body() createDto: CreateCoTucRequestDto) {
        return await this.coTucService.createCoTuc(createDto);
    }

    @Get('get-pagination-co-tuc')
    async getPaginationCoTuc(
        @Query('namChot', ParseIntPipe) namChot: number, @Body() sortDto: any,
        @Query('limit', new ParseIntPipe({ optional: true })) limit: number,
        @Query('page', new ParseIntPipe({ optional: true })) page: number,
        @Query('searchCoTuc') searchCoTuc: string,
        @Query('filterLuuKy', new ParseBoolPipe({ optional: true })) filterLuuKy: boolean,
        @Query('filterThanhToan', new ParseBoolPipe({ optional: true })) filterThanhToan: boolean,
    ): Promise<{ list: CoTucEntity[], total: number }> {
        return await this.danhSachCoTucService.getPagination(
            namChot, sortDto, limit, page, searchCoTuc, filterLuuKy, filterThanhToan
        );
    }

    @Get('get-co-tuc/:id')
    async getCoTucById(@Param('id', ParseIntPipe) id: number) {
        return await this.coTucService.getCoTucById(id);
    }

    @Patch('update-co-tuc')
    async updateCoTuc(@Body() updateDto: UpdateCoTucRequestDto) {
        return await this.coTucService.updateCoTuc(updateDto);
    }

    @Delete('delete-co-tuc/:id')
    async deleteCoTucById(@Param('id', ParseIntPipe) id: number) {
        return await this.coTucService.deleteCoTucById(id);
    }
}