import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ThanhToanTaxEntity } from "../entity/thanh-toan-tax.entity";
import { Between, DeleteResult, Repository } from "typeorm";
import { CreateThanhToanTaxRequestDto } from "../dto/request/create-thanh-toan-tax.request.dto";
import { UpdateThanhToanTaxRequestDto } from "../dto/request/update-thanh-toan-tax.request.dto";
import { Transactional } from "typeorm-transactional";

@Injectable()
export class ThanhToanTaxService {
    constructor(
        @InjectRepository(ThanhToanTaxEntity) private thanhToanTaxRepo: Repository<ThanhToanTaxEntity>,
    ) { }

    async createThanhToanTax(createDto: CreateThanhToanTaxRequestDto): Promise<ThanhToanTaxEntity> {
        const thanhToan = this.thanhToanTaxRepo.create(createDto);
        return await this.thanhToanTaxRepo.save(thanhToan);
    }

    async getThanhToanTaxById(id: number) {
        const thanhToan = await this.thanhToanTaxRepo.findOneBy({ id: id });
        if (!thanhToan) {
            throw new NotFoundException('cannot find thanh toan tax');
        }
        return thanhToan;
    }

    async getThanhToanTaxByHopDongUUID(
        hopDongUUID: string, year: number, sortDto?: any
    ): Promise<ThanhToanTaxEntity[]> {
        const startDate = `${year}-01-01`;
        const endDate = `${year}-12-31`;
        return await this.thanhToanTaxRepo.find({
            where: {
                hopDongUUID: hopDongUUID,
                ngayThanhToan: Between(startDate, endDate),
            },
            order: sortDto,
        });

    }

    async updateThanhToanTax(udpateDto: UpdateThanhToanTaxRequestDto): Promise<ThanhToanTaxEntity> {
        const updateThanhToan = await this.thanhToanTaxRepo.findOneBy({ id: udpateDto.id });
        if (!updateThanhToan) {
            throw new NotFoundException('cannot find thanhToanTax for update');
        }
        Object.assign(updateThanhToan, udpateDto);
        return await this.thanhToanTaxRepo.save(updateThanhToan);
    }

    async deleteThanhToanTax(thanhToanId: number): Promise<DeleteResult> {
        const remove = await this.thanhToanTaxRepo.delete({ id: thanhToanId });
        if (remove.affected === 0) {
            throw new NotFoundException('cannot found thanh toan hop dong for delete');
        }
        return remove;
    }

    @Transactional()
    async deleteThanhToanTaxByUUID(uuid: string): Promise<DeleteResult> {
        return await this.thanhToanTaxRepo.delete({ hopDongUUID: uuid });
    }
}