import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CoDongEntity } from "../entity/co-dong.entity";
import { ILike, LessThan, MoreThanOrEqual, Repository } from "typeorm";
import * as ExcelJS from 'exceljs';
import { CreateCoDongDto } from "../dto/request/create-co-dong.request.dto";
import path from "path";
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { Transactional } from "typeorm-transactional";
import * as _ from 'lodash';
import { CoDongResponseDto } from "../dto/response/co-dong.response.dto";
dayjs.extend(customParseFormat);

@Injectable()
export class DanhSachCoDongService {
    constructor(
        @InjectRepository(CoDongEntity) private coDongRepo: Repository<CoDongEntity>
    ) { }

    private findStartData(worksheet: ExcelJS.Worksheet): number {
        let row = 1;
        for (; row <= worksheet.actualRowCount; ++row) {
            const value = worksheet.getCell(row, 1).value;
            if (String(value).toLowerCase() == 'stt') {
                ++row;
                break;
            }
        }
        return row;
    }

    private createData(worksheet: ExcelJS.Worksheet, row: number): CreateCoDongDto {
        const coDong = new CreateCoDongDto();
        coDong.hoTen = String(worksheet.getCell(row, 2).value ?? "");
        coDong.soDKSH = String(worksheet.getCell(row, 3).value ?? "");
        coDong.ngayCap = String(worksheet.getCell(row, 4).value ?? "");
        coDong.diaChi = String(worksheet.getCell(row, 5).value ?? "");
        coDong.email = String(worksheet.getCell(row, 6).value ?? "");
        coDong.dienThoai = String(worksheet.getCell(row, 7).value ?? "");
        coDong.quocTich = String(worksheet.getCell(row, 8).value ?? "");
        coDong.slckngCong = Number(worksheet.getCell(row, 11) ?? 0);
        coDong.ghiChu = String(worksheet.getCell(row, 15).value ?? "");
        coDong.type = Number(worksheet.getCell(row, 16) ?? 1);
        coDong.cntc = Number(worksheet.getCell(row, 17) ?? 1);
        coDong.txnum = String(worksheet.getCell(row, 18) ?? "");
        return coDong;
    }

    private handleSoDKSH(list: CreateCoDongDto[]): CreateCoDongDto {
        if (list.length < 2) {
            return list[0];
        }
        list = list.sort((pA: CreateCoDongDto, pB: CreateCoDongDto) => {
            const dateA = dayjs(pA.ngayCap, "DD/MM/YYYY");
            const dateB = dayjs(pB.ngayCap, "DD/MM/YYYY");
            return dateB.diff(dateA);
        });
        list[0].ngayCap = list.map((val) => val.ngayCap).join(",");
        list[0].slckngCong = list.reduce((prev, current) => prev + current.slckngCong, 0);
        return list[0];
    }

    private async getFivePercentSlckng(): Promise<number> {
        const total = await this.coDongRepo.sum("slckngCong") ?? 0;
        return Math.round(total * 5 / 100);
    }

    @Transactional()
    async createDanhSachCoDong(file: Express.Multer.File) {
        const ext = path.extname(file.originalname);
        if (ext != '.xlsx') {
            throw new BadRequestException("only support extension file .xlsx");
        }
        const workbook = new ExcelJS.Workbook();
        await workbook.xlsx.readFile(file.path);
        const worksheet = workbook.getWorksheet(1);
        if (!workbook || !worksheet) {
            throw new BadRequestException('read file error');
        }
        await this.coDongRepo.clear();
        const map = new Map<string, CreateCoDongDto[]>();
        // find row start data
        let i = this.findStartData(worksheet);
        for (; i <= worksheet.actualRowCount && worksheet.getCell(i, 1).value; ++i) {
            const coDong = this.createData(worksheet, i);
            if (!map.has(coDong.soDKSH)) {
                map.set(coDong.soDKSH, new Array<CreateCoDongDto>());
            }
            map.get(coDong.soDKSH)?.push(coDong);
        }
        const listCoDong = new Array<CreateCoDongDto>();
        for (const values of map.values()) {
            const coDong = this.handleSoDKSH(values);
            listCoDong.push(coDong);
        }
        const chunks = _.chunk(listCoDong, 1000);
        for (const chunk of chunks) {
            await this.coDongRepo.createQueryBuilder()
                .insert().into(CoDongEntity).values(chunk).execute();
        }
    }

    async getPaginationCoDong(
        sortDto?: any, limit?: number, page?: number, searchCoDong?: string,
        filterCoDongLon?: boolean, filterType?: number, filterCntc?: number,
    ): Promise<[CoDongResponseDto[], number]> {
        const optinalWhere = {
            type: filterType,
            cntc: filterCntc,
        } as any;
        if (filterCoDongLon != undefined) {
            const fivePercent = await this.getFivePercentSlckng();
            optinalWhere.slckngCong =
                filterCoDongLon ? MoreThanOrEqual(fivePercent) : LessThan(fivePercent);
        }
        const [list, total] = await this.coDongRepo.findAndCount({
            take: limit == 0 ? undefined : limit,
            skip: limit && page ? limit * page : undefined,
            where: {
                searchCol: searchCoDong ? ILike(`%${searchCoDong}%`) : undefined,
                ...optinalWhere
            },
            order: sortDto
        });
        const listCoDong = new Array<CoDongResponseDto>();
        for (const coDongEntity of list) {
            const { ngayCap, ...rest } = coDongEntity;
            const ngayCapList = ngayCap.split(",");
            const coDong = Object.assign(new CoDongResponseDto(), { ...rest, ngayCap: ngayCapList });
            listCoDong.push(coDong);
        }
        return [listCoDong, total];
    }
}