import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CoTucEntity } from "../entity/co-tuc.entity";
import { ILike, MoreThan, Repository } from "typeorm";
import { ChiTietCoTucEntity } from "../entity/chi-tiet-co-tuc.entity";
import * as ExcelJS from 'exceljs';
import { Transactional } from "typeorm-transactional";
import path from "path";
import { CreateChiTietCoTucRequestDto } from "../dto/request/create-chi-tiet-co-tuc.request.dto";
import { CreateCoTucRequestDto } from "../dto/request/create-co-tuc.request.dto";
import * as _ from "lodash";

@Injectable()
export class DanhSachToTucService {
    constructor(
        @InjectRepository(CoTucEntity) private coTucRepo: Repository<CoTucEntity>,
        @InjectRepository(ChiTietCoTucEntity) private chiTietCoTucRepo: Repository<ChiTietCoTucEntity>
    ) { }

    private findRowStart(worksheet: ExcelJS.Worksheet): number {
        for (let i = 1; i <= worksheet.actualRowCount; ++i) {
            const cell = worksheet.getCell(i, 2);
            if (String(cell.value) == '1.1.1') {
                return i;
            }
        }
        return worksheet.actualRowCount;
    }
    private createData(
        worksheet: ExcelJS.Worksheet, row: number, namChot: number
    ): { coTuc: CreateCoTucRequestDto, chiTietCoTuc: CreateChiTietCoTucRequestDto } {
        const coTuc = new CreateCoTucRequestDto();
        const chiTietCoTuc = new CreateChiTietCoTucRequestDto();
        coTuc.hoTen = String(worksheet.getCell(row, 3).value ?? "");
        coTuc.sid = String(worksheet.getCell(row, 4).value ?? "");
        coTuc.soDKSH = String(worksheet.getCell(row, 6).value ?? "");
        coTuc.ngayCap = String(worksheet.getCell(row, 7).value ?? "");
        coTuc.diaChi = String(worksheet.getCell(row, 8).value ?? "");
        coTuc.email = String(worksheet.getCell(row, 9).value ?? "");
        coTuc.dienThoai = String(worksheet.getCell(row, 10).value ?? "");
        coTuc.quocTich = String(worksheet.getCell(row, 11).value ?? "");
        chiTietCoTuc.soDKSH = coTuc.soDKSH;
        chiTietCoTuc.soDkshNamChot = `${coTuc.soDKSH}-${namChot}`;
        chiTietCoTuc.slckngChuaLk = Number(worksheet.getCell(row, 12).value ?? 0);
        chiTietCoTuc.slckngDaLk = Number(worksheet.getCell(row, 13).value ?? 0);
        chiTietCoTuc.slckngChuaLkTruocTax = Number(worksheet.getCell(row, 15).value ?? 0);
        chiTietCoTuc.slckngDaLkTruocTax = Number(worksheet.getCell(row, 16).value ?? 0);
        chiTietCoTuc.slckngChuaLkSauTax = Number(worksheet.getCell(row, 21).value ?? 0);
        chiTietCoTuc.slckngDaLkSauTax = Number(worksheet.getCell(row, 22).value ?? 0);
        chiTietCoTuc.namChot = namChot;
        return { coTuc, chiTietCoTuc };
    }

    @Transactional()
    async createDanhSachCoTuc(file: Express.Multer.File, namChot: number) {
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
        const rowStart = this.findRowStart(worksheet);
        const listCoTuc = new Array<CreateCoTucRequestDto>();
        const listChiTietCoTuc = new Array<CreateChiTietCoTucRequestDto>();
        for (let i = rowStart; i <= worksheet.actualRowCount && worksheet.getCell(i, 2).value; ++i) {
            const { coTuc, chiTietCoTuc } = this.createData(worksheet, i, namChot);
            listCoTuc.push(coTuc);
            listChiTietCoTuc.push(chiTietCoTuc);
        }
        const chunksCoTuc = _.chunk(listCoTuc, 1000);
        const chunksChiTietCoTuc = _.chunk(listChiTietCoTuc, 1000);
        for (const chunk of chunksCoTuc) {
            await this.coTucRepo.upsert(chunk, {
                conflictPaths: { soDKSH: true },
                skipUpdateIfNoValuesChanged: true,
            });
        }
        for (const chunk of chunksChiTietCoTuc) {
            await this.chiTietCoTucRepo.upsert(chunk, {
                conflictPaths: { soDkshNamChot: true },
                skipUpdateIfNoValuesChanged: true,
            });
        }
    }

    async getPagination(
        namChot: number, sortDto?: any, limit?: number, page?: number, searchCoTuc?: string,
        filterLuuKy?: boolean, filterThanhToan?: boolean
    ): Promise<{ list: CoTucEntity[], total: number }> {
        const optinalWhere = {} as any;
        if (filterLuuKy != undefined) {
            if (filterLuuKy) {
                optinalWhere.slckngDaLk = MoreThan(0);
                if (filterThanhToan != undefined) {
                    optinalWhere.thanhToanDaLk = filterThanhToan;
                }
            } else {
                optinalWhere.slckngChuaLk = MoreThan(0);
                if (filterThanhToan != undefined) {
                    optinalWhere.thanhToanChuaLk = filterThanhToan;
                }
            }
        }
        const [listCoTuc, total] = await this.coTucRepo.findAndCount({
            relations: {
                chiTietCoTuc: true,
            },
            where: {
                chiTietCoTuc: {
                    namChot: namChot,
                    ...optinalWhere,
                },
                searchCol: searchCoTuc ? ILike(`%${searchCoTuc}%`) : undefined,
            },
            take: limit != 0 ? limit : undefined,
            skip: limit && page ? limit * page : undefined,
            order: sortDto,
        });

        return { list: listCoTuc, total };
    }
}