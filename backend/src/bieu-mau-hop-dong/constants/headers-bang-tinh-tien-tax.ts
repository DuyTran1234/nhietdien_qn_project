import { HeaderColumn } from "../model/header-column.model";

export const headersBangTinhTienTax = [
    new HeaderColumn({ header: 'Stt', key: 'stt', width: 10 }),
    new HeaderColumn({ header: 'Vị trí đất thuê', key: 'viTriThue', width: 25 }),
    new HeaderColumn({ header: 'Số hợp đồng', key: 'soHopDong', width: 30 }),
    new HeaderColumn(
        { header: 'Diện tích (m2)', key: 'dienTich', width: 20, style: { numFmt: '#,##0.00' } }
    ),
    new HeaderColumn({ header: 'Đơn giá (đồng)', key: 'donGia', width: 20, style: { numFmt: '#,##0' } }),
    new HeaderColumn(
        { header: 'Thuế suất (%)', key: 'thueSuat', width: 10, style: { numFmt: '#,##0.00' } }
    ),
    new HeaderColumn({ header: 'Tháng sử dụng (tháng)', key: 'soThangSuDung', width: 15 }),
    new HeaderColumn({ header: 'Thành tiền', key: 'tongTien', width: 25, style: { numFmt: '#,##0' } }),
    new HeaderColumn({ header: 'Ghi chú', key: 'ghiChu', width: 15 }),
];