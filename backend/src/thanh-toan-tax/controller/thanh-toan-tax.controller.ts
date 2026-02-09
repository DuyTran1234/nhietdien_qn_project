import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query } from "@nestjs/common";
import { CreateThanhToanTaxRequestDto } from "../dto/request/create-thanh-toan-tax.request.dto";
import { ThanhToanTaxEntity } from "../entity/thanh-toan-tax.entity";
import { ThanhToanTaxService } from "../service/thanh-toan-tax.service";
import { UpdateThanhToanTaxRequestDto } from "../dto/request/update-thanh-toan-tax.request.dto";
import { DeleteResult } from "typeorm";

@Controller('thanh-toan-tax')
export class ThanhToanTaxController {
    constructor(
        private thanhToanTaxService: ThanhToanTaxService,
    ) { }

    @Post('create')
    async createThanhToanTax(
        @Body() createDto: CreateThanhToanTaxRequestDto
    ): Promise<ThanhToanTaxEntity> {
        return await this.thanhToanTaxService.createThanhToanTax(createDto);
    }

    @Get('get-by-hop-dong-uuid')
    async getThanhToanTaxByHopDongUUID(
        @Query('hopDongUUID') hopDongUUID: string, @Query('year', ParseIntPipe) year: number,
        @Body() sortDto: any
    ): Promise<ThanhToanTaxEntity[]> {
        return await this.thanhToanTaxService.getThanhToanTaxByHopDongUUID(hopDongUUID, year, sortDto);
    }

    @Patch('update')
    async updateThanhToanTax(@Body() dto: UpdateThanhToanTaxRequestDto): Promise<ThanhToanTaxEntity> {
        return await this.thanhToanTaxService.updateThanhToanTax(dto);
    }

    @Delete('/delete/:id')
    async deleteThanhToanTax(@Param('id', ParseIntPipe) id: number): Promise<DeleteResult> {
        return await this.thanhToanTaxService.deleteThanhToanTax(id);
    }
}