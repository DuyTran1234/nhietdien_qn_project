import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query } from "@nestjs/common";
import { ThueSuatDatService } from "../service/thue-suat-dat.service";
import { CreateThueSuatDatDto } from "../dto/create-thue-suat-dat.dto";
import { ThueSuatDatEntity } from "../entity/thue-suat-dat.entity";
import { UpdateThueSuatDatDto } from "../dto/update-thue-suat-dat.dto";

@Controller('thue-suat-dat')
export class ThueSuatDatController {
    constructor(
        private thueSuatDatService: ThueSuatDatService,
    ) { }

    @Post('create')
    async createThueSuatDat(@Body() thueSuatDatDto: CreateThueSuatDatDto): Promise<ThueSuatDatEntity> {
        return await this.thueSuatDatService.createThueSuatDat(thueSuatDatDto);
    }

    @Get('get/:id')
    async getThueSuatDat(@Param('id', ParseIntPipe) id: number): Promise<ThueSuatDatEntity> {
        return await this.thueSuatDatService.getThueSuatDat(id);
    }

    @Get('get-pagination')
    async getThueSuatDatPagination(
        @Query('limit', ParseIntPipe) limit: number,
        @Query('page', ParseIntPipe) page: number,
    ): Promise<{ list: ThueSuatDatEntity[], total: number }> {
        return await this.thueSuatDatService.getThueSuatDatPagination(limit, page);
    }

    @Patch('update')
    async updateThueSuatDat(@Body() thueSuatDatDto: UpdateThueSuatDatDto): Promise<ThueSuatDatEntity> {
        return await this.thueSuatDatService.updateThueSuatDat(thueSuatDatDto);
    }

    @Delete('delete/:id')
    async deleteThueSuatDat(@Param('id', ParseIntPipe) id: number) {
        return await this.thueSuatDatService.deleteThueSuatDat(id);
    }
}