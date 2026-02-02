import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ThueSuatDatEntity } from "../entity/thue-suat-dat.entity";
import { Repository } from "typeorm";
import { CreateThueSuatDatDto } from "../dto/create-thue-suat-dat.dto";
import { UpdateThueSuatDatDto } from "../dto/update-thue-suat-dat.dto";

@Injectable()
export class ThueSuatDatService {
    constructor(
        @InjectRepository(ThueSuatDatEntity) private thueSuatDat: Repository<ThueSuatDatEntity>,
    ) { }

    async createThueSuatDat(thueSuatDatDto: CreateThueSuatDatDto): Promise<ThueSuatDatEntity> {
        thueSuatDatDto.isActive = true;
        const thueSuatDatCreate = this.thueSuatDat.create(thueSuatDatDto);
        return await this.thueSuatDat.save(thueSuatDatCreate);
    }

    async getThueSuatDat(id: number): Promise<ThueSuatDatEntity> {
        const find = await this.thueSuatDat.findOneBy({ id: id, isActive: true });
        if (!find) {
            throw new BadRequestException('cannot find thue suat');
        }
        return find;
    }

    async getThueSuatDatPagination(
        limit: number, page: number
    ): Promise<{ list: ThueSuatDatEntity[], total: number }> {
        const [list, total] = await this.thueSuatDat.findAndCount({
            where: { isActive: true },
            take: limit,
            skip: page * limit,
            order: {
                id: 'desc',
            },
        });
        return { list, total };
    }

    async updateThueSuatDat(thueSuatDatDto: UpdateThueSuatDatDto): Promise<ThueSuatDatEntity> {
        const findThueSuat = await this.thueSuatDat.findOneBy({ id: thueSuatDatDto.id });
        if (!findThueSuat) {
            throw new BadRequestException('cannot find thue suat');
        }
        Object.assign(findThueSuat, thueSuatDatDto);
        return await this.thueSuatDat.save(findThueSuat);
    }

    async deleteThueSuatDat(id: number) {
        const findThueSuat = await this.thueSuatDat.findOneBy({ id });
        if (!findThueSuat) {
            throw new BadRequestException('cannot find thue suat');
        }
        findThueSuat.isActive = false;
        return await this.thueSuatDat.save(findThueSuat);
    }
}