import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CoTucEntity } from "../entity/co-tuc.entity";
import { Repository } from "typeorm";
import { CreateCoTucRequestDto } from "../dto/request/create-co-tuc.request.dto";

@Injectable()
export class CoTucService {
    constructor(
        @InjectRepository(CoTucEntity) private coTucRepo: Repository<CoTucEntity>,
    ) { }

    async createCoTuc(createDto: CreateCoTucRequestDto) {
        const create = this.coTucRepo.create(createDto);
        return await this.coTucRepo.save(create);
    }
}