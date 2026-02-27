import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CoTucEntity } from "../entity/co-tuc.entity";
import { Repository } from "typeorm";
import { CreateCoTucRequestDto } from "../dto/request/create-co-tuc.request.dto";
import { UpdateCoTucRequestDto } from "../dto/request/update-co-tuc.request.dto";

@Injectable()
export class CoTucService {
    constructor(
        @InjectRepository(CoTucEntity) private coTucRepo: Repository<CoTucEntity>,
    ) { }

    async createCoTuc(createDto: CreateCoTucRequestDto): Promise<CoTucEntity> {
        const create = this.coTucRepo.create(createDto);
        return await this.coTucRepo.save(create);
    }

    async getCoTucById(id: number): Promise<CoTucEntity> {
        const coTuc = await this.coTucRepo.findOneBy({ id: id });
        if (!coTuc) {
            throw new BadRequestException('cannot find co tuc');
        }
        return coTuc;
    }

    async updateCoTuc(updateDto: UpdateCoTucRequestDto): Promise<CoTucEntity> {
        const coTuc = await this.coTucRepo.findOneBy({ id: updateDto.id });
        if (!coTuc) {
            throw new BadRequestException('cannot find co tuc for update');
        }
        Object.assign(coTuc, updateDto);
        return await this.coTucRepo.save(coTuc);
    }

    async deleteCoTucById(id: number) {
        const coTuc = await this.coTucRepo.findOneBy({ id: id });
        if (!coTuc) {
            throw new BadRequestException('cannot find co tuc for delete');
        }
        return await this.coTucRepo.remove(coTuc);
    }
}