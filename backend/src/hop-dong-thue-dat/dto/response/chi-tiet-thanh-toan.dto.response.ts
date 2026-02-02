
export class ChiTietThanhToanDtoResponse {
    constructor(tongSoTien: number, daThanhToan: number) {
        this.tongSoTien = tongSoTien;
        this.daThanhToan = daThanhToan;
    }

    tongSoTien: number;
    daThanhToan: number;
}