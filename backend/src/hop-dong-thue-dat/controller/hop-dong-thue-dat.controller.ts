import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query } from "@nestjs/common";
import { HopDongThueDatService } from "../service/hop-dong-thue-dat.service";
import { CreateHopDongThueDatDto } from "../dto/create-hop-dong-thue-dat.dto";
import { SortHopDongThueDatDto } from "../dto/order-hop-dong-thue-dat.dto";
import { HopDongThueDatEntity } from "../entity/hop-dong-thue-dat.entity";
import { UpdateHopDongThueDatDto } from "../dto/update-hop-dong-thue-dat.dto";
import { HopDongThueDatDtoResponse } from "../dto/response/hop-dong-thue-dat.dto.response";

@Controller('hop-dong-thue-dat')
export class HopDongThueDatController {
    constructor(
        private hopDongService: HopDongThueDatService,
    ) { }

    @Post('create')
    async createHopDongThueDat(@Body() createDto: CreateHopDongThueDatDto): Promise<HopDongThueDatEntity> {
        return await this.hopDongService.createHopDongThueDat(createDto);
    }

    @Get('get/:uuid')
    async getHopDongThueDat(
        @Param('uuid') uuid: string, @Body() orderDTO: SortHopDongThueDatDto,
    ): Promise<HopDongThueDatEntity[]> {
        return await this.hopDongService.getHopDongThueDat(uuid, orderDTO);
    }

    @Get('get-pagination')
    async getPaginationHopDongThueDat(
        @Query('limit', ParseIntPipe) limit: number, @Query('page', ParseIntPipe) page: number,
        @Query('findHD') findHD: string, @Body() sortDto: SortHopDongThueDatDto
    ): Promise<[HopDongThueDatDtoResponse[], number]> {
        return await this.hopDongService.getPaginationHopDongThueDat(sortDto, limit, page, findHD);
    }

    @Patch('update')
    async updateHopDongThueDat(@Body() updateDto: UpdateHopDongThueDatDto): Promise<HopDongThueDatEntity> {
        return await this.hopDongService.updateHopDongThueDat(updateDto);
    }

    @Patch('close/:uuid')
    async closeHopDongThueDat(@Param('uuid') hopDongUUID: string) {
        return await this.hopDongService.closeHopDongThueDat(hopDongUUID);
    }

    @Delete('delete-by-id/:id')
    async deleteHopDongThueDatById(@Param('id', ParseIntPipe) id: number): Promise<HopDongThueDatEntity> {
        return await this.hopDongService.deleteHopDongThueDatById(id);
    }

    @Delete('delete-by-uuid/:uuid')
    async deleteListHopDongThueDatByUUID(
        @Param('uuid') hopDongUUID: string
    ) {
        return await this.hopDongService.deleteHopDongThueDatByUUID(hopDongUUID);
    }
}