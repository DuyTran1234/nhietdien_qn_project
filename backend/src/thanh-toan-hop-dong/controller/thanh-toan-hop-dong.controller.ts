import { Body, Controller, Delete, Param, ParseIntPipe, Patch, Post } from "@nestjs/common";
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