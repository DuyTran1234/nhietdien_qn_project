import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from "@nestjs/common";
import { ChiTietCoTucService } from "../service/chi-tiet-co-tuc.service";
import { CreateChiTietCoTucRequestDto } from "../dto/request/create-chi-tiet-co-tuc.request.dto";
import { UpdateChiTietCoTucRequestDto } from "../dto/request/update-chi-tiet-co-tuc.request.dto";

@Controller('chi-tiet-co-tuc')
export class ChiTietCoTucController {
    constructor(
        private chiTietCoTucService: ChiTietCoTucService,
    ) { }

    @Post('create-chi-tiet-co-tuc')
    async createChiTietCoTuc(@Body() createDto: CreateChiTietCoTucRequestDto) {
        return await this.chiTietCoTucService.createChiTietCoTuc(createDto);
    }

    @Get('get-chi-tiet-co-tuc/:id')
    async getChiTietCoTucById(@Param('id', ParseIntPipe) id: number) {
        return await this.chiTietCoTucService.getChiTietCoTucById(id);
    }

    @Patch('update-chi-tiet-co-tuc')
    async updateChiTietCoTuc(@Body() updateDto: UpdateChiTietCoTucRequestDto) {
        return await this.chiTietCoTucService.updateChiTietCoTuc(updateDto);
    }

    @Delete('delete-chi-tiet-co-tuc/:id')
    async deleteChiTietCoTucById(@Param('id', ParseIntPipe) id: number) {
        return await this.chiTietCoTucService.deleteChiTietCoTucById(id);
    }
}