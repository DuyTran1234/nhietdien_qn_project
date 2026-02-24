import { HopDongThueDatEntity } from "../../entity/hop-dong-thue-dat.entity";
import { ChiTietNopTaxResponseDto } from "./chi-tiet-nop-tax.response.dto";
import { ChiTietSuDungResponseDto } from "./chi-tiet-su-dung.response.dto";
import { ChiTietThanhToanDtoResponse } from "./chi-tiet-thanh-toan.dto.response";

export class HopDongThueDatDtoResponse extends HopDongThueDatEntity {
    chiTietSuDung: ChiTietSuDungResponseDto;
    chiTietCacKy: ChiTietThanhToanDtoResponse[];
    chiTietNopTax: ChiTietNopTaxResponseDto;
    olderHopDong: HopDongThueDatDtoResponse | null;
}