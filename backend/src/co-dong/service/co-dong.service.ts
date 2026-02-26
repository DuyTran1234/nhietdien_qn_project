import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CoDongEntity } from "../entity/co-dong.entity";
import { DeleteResult, Repository } from "typeorm";
import { CreateCoDongDto } from "../dto/request/create-co-dong.request.dto";
import { CoDongResponseDto } from "../dto/response/co-dong.response.dto";
import { UpdateCoDongRequestDto } from "../dto/request/update-co-dong.request.dto";
import dayjs from "dayjs";
import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(customParseFormat);

@Injectable()
export class CoDongService {
    constructor(
        @InjectRepository(CoDongEntity) private coDongRepo: Repository<CoDongEntity>,
    ) { }

    async createCoDong(createDto: CreateCoDongDto): Promise<CoDongResponseDto> {
        const create = this.coDongRepo.create(createDto);
        const save = await this.coDongRepo.save(create);
        const { ngayCap, ...rest } = save;
        return Object.assign(new CoDongResponseDto(), { ngayCap: [ngayCap], ...rest });
    }

    async getCoDongById(id: number): Promise<CoDongResponseDto> {
        const coDong = await this.coDongRepo.findOneBy({ id: id });
        if (!coDong) {
            throw new BadRequestException('cannot find co dong');
        }
        const { ngayCap, ...rest } = coDong;
        const ngayCapList = ngayCap.split(",");
        return Object.assign(new CoDongResponseDto(), { ngayCap: ngayCapList, ...rest });
    }

    async updateCoDong(updateDto: UpdateCoDongRequestDto): Promise<CoDongResponseDto> {
        const coDong = await this.coDongRepo.findOneBy({ id: updateDto.id });
        if (!coDong) {
            throw new BadRequestException('cannot find co dong for update');
        }
        const listStr = updateDto.ngayCap.sort((a, b) => {
            const dateA = dayjs(a, "DD/MM/YYYY");
            const dateB = dayjs(b, "DD/MM/YYYY");
            return dateB.diff(dateA);
        }).join(",");
        Object.assign(coDong, { ...updateDto, ngayCap: listStr });
        const save = await this.coDongRepo.save(coDong);
        const { ngayCap, ...rest } = save;
        const ngayCapList = ngayCap.split(",");
        return Object.assign(new CoDongResponseDto(), { ngayCap: ngayCapList, ...rest });
    }

    async deleteCoDongById(id: number): Promise<DeleteResult> {
        const rs = await this.coDongRepo.delete({ id: id });
        if (rs.affected == 0) {
            throw new BadRequestException("cannot find co dong for delete");
        }
        return rs;
    }
}