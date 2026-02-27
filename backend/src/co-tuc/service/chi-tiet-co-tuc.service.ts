import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CoTucEntity } from "../entity/co-tuc.entity";
import { ChiTietCoTucEntity } from "../entity/chi-tiet-co-tuc.entity";
import { Repository } from "typeorm";
import { CreateChiTietCoTucRequestDto } from "../dto/request/create-chi-tiet-co-tuc.request.dto";
import { UpdateChiTietCoTucRequestDto } from "../dto/request/update-chi-tiet-co-tuc.request.dto";

@Injectable()
export class ChiTietCoTucService {
    constructor(
        @InjectRepository(CoTucEntity) private coTucRepo: Repository<CoTucEntity>,
        @InjectRepository(ChiTietCoTucEntity) private chiTietCoTucRepo: Repository<ChiTietCoTucEntity>
    ) { }

    async createChiTietCoTuc(createDto: CreateChiTietCoTucRequestDto) {
        const coTuc = await this.coTucRepo.findOneBy({ soDKSH: createDto.soDKSH });
        if (!coTuc) {
            throw new BadRequestException('cannot find co tuc for create chi tiet co tuc');
        }
        const create = this.chiTietCoTucRepo.create(createDto);
        return await this.chiTietCoTucRepo.save(create);
    }

    async getChiTietCoTucById(id: number) {
        const chiTiet = await this.chiTietCoTucRepo.findOneBy({ id: id });
        if (!chiTiet) {
            throw new BadRequestException('cannot find chi tiet co tuc');
        }
        return chiTiet;
    }

    async updateChiTietCoTuc(updateDto: UpdateChiTietCoTucRequestDto) {
        const chiTiet = await this.chiTietCoTucRepo.findOneBy({ id: updateDto.id });
        if (!chiTiet) {
            throw new BadRequestException('cannot find chi tiet co tuc for update');
        }
        Object.assign(chiTiet, updateDto);
        return await this.chiTietCoTucRepo.save(chiTiet);
    }

    async deleteChiTietCoTucById(id: number) {
        const chiTiet = await this.chiTietCoTucRepo.findOneBy({ id: id });
        if (!chiTiet) {
            throw new BadRequestException('cannot find chi tiet co tuc for delete');
        }
        return await this.chiTietCoTucRepo.remove(chiTiet);
    }
}