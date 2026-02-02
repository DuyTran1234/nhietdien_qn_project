import { HopDongThueDatEntity } from "../../entity/hop-dong-thue-dat.entity";
import { ChiTietThanhToanDtoResponse } from "./chi-tiet-thanh-toan.dto.response";

export class HopDongThueDatDtoResponse extends HopDongThueDatEntity {
    chiTietCacKy: ChiTietThanhToanDtoResponse[];
}