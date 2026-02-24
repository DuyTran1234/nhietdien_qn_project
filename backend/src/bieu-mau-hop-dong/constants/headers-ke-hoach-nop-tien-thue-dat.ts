import { HeaderColumn } from "../model/header-column.model";

export const headersKeHoachNopTienThueDat = [
    new HeaderColumn({ header: 'Stt', key: 'stt', width: 10 }),
    new HeaderColumn({ header: 'Vị trí thuê', key: 'viTriThue', width: 30 }),
    new HeaderColumn({ header: 'Số hợp đồng', key: 'soHopDong', width: 30 }),
    new HeaderColumn({ header: 'Diện tích (m2)', key: 'dienTich', width: 20, style: { numFmt: '#,##0.00' } }),
    new HeaderColumn({ header: 'Đơn giá (đồng)', key: 'donGia', width: 20, style: { numFmt: '#,##0' } }),
    new HeaderColumn({ header: 'Số tháng sử dụng', key: 'soThangSuDung', width: 20 }),
    new HeaderColumn({ header: 'Số tiền (đồng)', key: 'tongTien', width: 30, style: { numFmt: '#,##0' } }),
    new HeaderColumn({ header: 'Ghi chú', key: 'ghiChu', width: 20 }),
];