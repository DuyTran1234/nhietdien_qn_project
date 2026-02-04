import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query } from "@nestjs/common";
import { ThanhToanHopDongService } from "../service/thanh-toan-hop-dong.service";
import { CreateThanhToanHopDongDto } from "../dto/create-thanh-toan-hop-dong.dto";
import { ThanhToanHopDongEntity } from "../entity/thanh-toan-hop-dong.entity";
import { UpdateThanhToanHopDongDTO } from "../dto/update-thanh-toan-hop-dong.dto";

@Controller('thanh-toan-hop-dong')
export class ThanhToanHopDongController {
    constructor(
        private thanhToanService: ThanhToanHopDongService,
    ) { }

    @Post('create')
    async createThanhToanHopDong(
        @Body() createDto: CreateThanhToanHopDongDto
    ): Promise<ThanhToanHopDongEntity> {
        return await this.thanhToanService.createThanhToanHopDong(createDto);
    }

    @Get('get-by-uuid')
    async getThanhToanHopDongByUUID(
        @Query('uuid') hopDongUUID: string, @Query('year', ParseIntPipe) year: number,
        @Body() sortDto?: any
    ) {
        return await this.thanhToanService.getThanhToanHopDongByHopDongUUID(hopDongUUID, year, sortDto);
    }

    @Patch('update')
    async updateThanhToanHopDong(
        @Body() updateDto: UpdateThanhToanHopDongDTO,
    ): Promise<ThanhToanHopDongEntity> {
        return await this.thanhToanService.updateThanhToanHopDong(updateDto);
    }

    @Delete('delete/:id')
    async deleteThanhToanHopDong(@Param('id', ParseIntPipe) thanhToanId: number) {
        return await this.thanhToanService.deleteThanhToanHopDong(thanhToanId);
    }
}