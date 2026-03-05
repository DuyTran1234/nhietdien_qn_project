import type { ThueSuatDatModel } from "./thue-suat-dat.model";

interface ChiTietSuDungResponseDto {
    newestMonthUsed: number;
    olderMonthUsed: number;
}

interface ChiTietThanhToanDtoResponse {
    tongSoTien: number;
    daThanhToan: number;
}

interface ChiTietNopTaxResponseDto {
    newestAmount: number;
    olderAmount: number;
    daThanhToan: number;
}

export interface HopDongThueDatModel {
    id: number;
    hopDongUUID: string;
    soHopDong: string
    hopDongDate: string;
    dienTich: number;
    batDauThue: string;
    soNamThue: number;
    endDate: string;
    mucDichThue: string;
    khuVucThue: string;
    viTriThue: string;
    thueSuatId: number;
    thueSuat: ThueSuatDatModel;
    giaPnn: number;
    isActive: boolean;
    isNewest: boolean;
    ghiChu: string;
    quyetDinhThueDatSo: string;
    quyetDinhThueDatDate: string;
    quyetDinhDonGiaSo: string;
    quyetDinhDonGiaDate: string;
    donGiaThue: number;
    onDinhDonGiaDate: string;
    soNamOnDinh: number;
    apDungDonGiaDate: string;
    chiTietSuDung: ChiTietSuDungResponseDto;
    chiTietCacKy: ChiTietThanhToanDtoResponse[];
    chiTietNopTax: ChiTietNopTaxResponseDto;
    olderHopDong: HopDongThueDatModel;
}