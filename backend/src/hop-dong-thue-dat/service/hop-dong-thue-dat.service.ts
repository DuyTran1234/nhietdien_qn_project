import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import dayjs from "dayjs";
import { DeleteResult, ILike, In, MoreThan, Repository, UpdateResult } from "typeorm";
import { Transactional } from "typeorm-transactional";
import { CreateHopDongThueDatDto } from "../dto/create-hop-dong-thue-dat.dto";
import { SortHopDongThueDatDto } from "../dto/order-hop-dong-thue-dat.dto";
import { HopDongThueDatDtoResponse } from "../dto/response/hop-dong-thue-dat.dto.response";
import { UpdateHopDongThueDatDto } from "../dto/update-hop-dong-thue-dat.dto";
import { HopDongThueDatEntity } from "../entity/hop-dong-thue-dat.entity";
import { KyThanhToanService } from "./ky-thanh-toan.service";

@Injectable()
export class HopDongThueDatService {
    constructor(
        @InjectRepository(HopDongThueDatEntity) private hopDongThueDat: Repository<HopDongThueDatEntity>,
        private kyThanhToanService: KyThanhToanService,
    ) { }

    @Transactional()
    async createHopDongThueDat(hopDongThueDatDto: CreateHopDongThueDatDto): Promise<HopDongThueDatEntity> {
        const updateHD = await this.hopDongThueDat.update({
            hopDongUUID: hopDongThueDatDto.hopDongUUID,
        }, { isActive: false, isNewest: false });
        const create = this.hopDongThueDat.create({ ...hopDongThueDatDto, isActive: true, isNewest: true });
        return await this.hopDongThueDat.save(create);
    }

    async getHopDongThueDat(
        hopDongUUID: string, orderDto: SortHopDongThueDatDto
    ): Promise<HopDongThueDatEntity[]> {
        const listHopDong = await this.hopDongThueDat.find({
            where: {
                hopDongUUID: hopDongUUID,
            },
            relations: {
                thueSuat: true,
            },
            order: orderDto as any,
        });
        return listHopDong;
    }

    async getPaginationHopDongThueDat(
        sortDto?: SortHopDongThueDatDto, limit?: number, page?: number, findHD?: string | undefined
    ): Promise<[HopDongThueDatDtoResponse[], number]> {
        const map = new Map<string, HopDongThueDatEntity[]>();
        const now = dayjs().format('YYYY-MM-DD');
        const [listHopDongNewest, total] = await this.hopDongThueDat.findAndCount({
            where: {
                endDate: MoreThan(now),
                isNewest: true,
                isActive: true,
                soHopDong: findHD ? ILike(`%${findHD}%`) : undefined,
            },
            relations: {
                thueSuat: true,
            },
            take: limit,
            skip: limit && page ? limit * page : undefined,
            order: sortDto as any,
        });
        const listHopDongUUID = new Array<string>();
        for (const hopDong of listHopDongNewest) {
            map.set(hopDong.hopDongUUID, [hopDong]);
            listHopDongUUID.push(hopDong.hopDongUUID);
        }
        const listHopDongOlder = await this.hopDongThueDat.find({
            where: {
                hopDongUUID: In(listHopDongUUID),
                isNewest: false,
            },
            relations: {
                thueSuat: true,
            },
            order: {
                apDungDonGiaDate: 'desc',
            },
        });
        for (const hopdong of listHopDongOlder) {
            map.get(hopdong.hopDongUUID)?.push(hopdong);
        }
        const listResult = new Array<HopDongThueDatDtoResponse>();
        for (const listHD of map.values()) {
            const chiTietCacKy =
                await this.kyThanhToanService.tinhToanTienKy(listHD[0], listHD.length > 1 ? listHD[1] : null);
            const hopDongDto = Object.assign(new HopDongThueDatDtoResponse(), { ...listHD[0], chiTietCacKy });
            listResult.push(hopDongDto);
        }
        return [listResult, total];
    }

    async updateHopDongThueDat(updateDto: UpdateHopDongThueDatDto): Promise<HopDongThueDatEntity> {
        const hopdong = await this.hopDongThueDat.findOneBy({ id: updateDto.id });
        if (!hopdong) {
            throw new BadRequestException('cannot find hop dong');
        }
        Object.assign(hopdong, updateDto);
        return await this.hopDongThueDat.save(hopdong);
    }

    @Transactional()
    async deleteHopDongThueDatById(hopdongId: number): Promise<HopDongThueDatEntity> {
        const hopdong = await this.hopDongThueDat.findOneBy({ id: hopdongId });
        if (!hopdong) {
            throw new NotFoundException('cannot find delete hop dong');
        }
        const removeHD = await this.hopDongThueDat.remove(hopdong);
        const listHopDong = await this.hopDongThueDat.find({
            where: {
                hopDongUUID: hopdong.hopDongUUID,
            },
            order: {
                apDungDonGiaDate: 'desc',
            }
        });
        if (listHopDong?.length > 0) {
            await this.hopDongThueDat.save({
                id: listHopDong[0].id,
                isActive: true,
                isNewest: true,
            });
        }
        return removeHD;
    }

    @Transactional()
    async deleteHopDongThueDatByUUID(hopDongUUID: string): Promise<DeleteResult> {
        const rs = await this.hopDongThueDat.delete({
            hopDongUUID: hopDongUUID,
        });
        if (rs.affected == 0) {
            throw new BadRequestException('cannot find hopdongUUID for delete');
        }
        return rs;
    }

    @Transactional()
    async closeHopDongThueDat(hopDongUUID: string): Promise<UpdateResult> {
        const rs = await this.hopDongThueDat.update({
            hopDongUUID: hopDongUUID,
        }, { isActive: false });
        if (rs.affected === 0) {
            throw new BadRequestException('cannot find hop dong uuid for update');
        }
        return rs;
    }
}