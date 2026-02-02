import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ThanhToanHopDongEntity } from "../entity/thanh-toan-hop-dong.entity";
import { Between, DeleteResult, Repository } from "typeorm";
import { CreateThanhToanHopDongDto } from "../dto/create-thanh-toan-hop-dong.dto";
import { UpdateThanhToanHopDongDTO } from "../dto/update-thanh-toan-hop-dong.dto";

@Injectable()
export class ThanhToanHopDongService {
    constructor(
        @InjectRepository(ThanhToanHopDongEntity) private thanhToanRepo: Repository<ThanhToanHopDongEntity>,
    ) { }

    async createThanhToanHopDong(createDto: CreateThanhToanHopDongDto): Promise<ThanhToanHopDongEntity> {
        const thanhToan = this.thanhToanRepo.create(createDto);
        return await this.thanhToanRepo.save(thanhToan);
    }

    async getThanhToanHopDongByHopDongUUID(
        hopDongUUID: string, year: number, sortDto: any
    ): Promise<ThanhToanHopDongEntity[]> {
        const startDate = `${year}-01-01`;
        const endDate = `${year}-12-31`;
        return await this.thanhToanRepo.find({
            where: {
                hopDongUUID: hopDongUUID,
                ngayThanhToan: Between(startDate, endDate),
            },
            order: sortDto,
        });
    }

    async updateThanhToanHopDong(updateDto: UpdateThanhToanHopDongDTO): Promise<ThanhToanHopDongEntity> {
        const thanhToan = await this.thanhToanRepo.findOneBy({ id: updateDto.id });
        if (!thanhToan) {
            throw new NotFoundException('not found thanh toan hop dong for update');
        }
        Object.assign(thanhToan, updateDto);
        return await this.thanhToanRepo.save(thanhToan);
    }

    async deleteThanhToanHopDong(thanhToanId: number): Promise<DeleteResult> {
        const remove = await this.thanhToanRepo.delete({ id: thanhToanId });
        if (remove.affected === 0) {
            throw new NotFoundException('cannot found thanh toan hop dong for delete');
        }
        return remove;
    }
}