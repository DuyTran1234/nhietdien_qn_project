import { Body, Controller, Post } from "@nestjs/common";
import { CreateCoTucRequestDto } from "../dto/request/create-co-tuc.request.dto";
import { CoTucService } from "../service/co-tuc.service";

@Controller('co-tuc')
export class CoTucController {
    constructor(
        private coTucService: CoTucService,
    ) { }

    @Post('create-co-tuc')
    async createCoTuc(@Body() createDto: CreateCoTucRequestDto) {
        return await this.coTucService.createCoTuc(createDto);
    }
}