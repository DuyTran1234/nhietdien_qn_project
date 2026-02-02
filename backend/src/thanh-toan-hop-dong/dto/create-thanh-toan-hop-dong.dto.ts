import { KyThanhToan } from "../enum/ky-thanh-toan.enum";
import { LoaiThanhToan } from "../enum/loai-thanh-toan.enum";

export class CreateThanhToanHopDongDto {
    hopDongUUID: string;
    ngayThanhToan: string;
    ky: KyThanhToan;
    tienThanhToan: number;
    loaiNop: LoaiThanhToan;
    note: string;
}