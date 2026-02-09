import { HeaderColumn } from "../model/header-column.model";

export const headersBangTinhTienKy1 = [
    new HeaderColumn({ header: 'Stt', key: 'stt', width: 10 }),
    new HeaderColumn({ header: 'Vị trí đất thuê', key: 'viTriThue', width: 20 }),
    new HeaderColumn({ header: 'Diện tích (m2)', key: 'dienTich', width: 20, style: { numFmt: '#,##0.00' } }),
    new HeaderColumn({ header: 'Đơn giá (đ/m2/năm)', key: 'donGia', width: 20, style: { numFmt: '#,##0' } }),
    new HeaderColumn({ header: 'Thành tiền (đồng)', key: 'tongTien', width: 25, style: { numFmt: '#,##0' } }),
    new HeaderColumn(
        { header: 'Số phải nộp kỳ I (đồng)', key: 'tienKy', width: 25, style: { numFmt: '#,##0' } }
    ),
    new HeaderColumn(
        { header: 'Số đã nộp/được miễn, giảm (đồng)', key: 'daThanhToan', width: 25, style: { numFmt: '#,##0' } }
    ),
    new HeaderColumn({ header: 'Số còn phải nộp (đồng)', key: 'canThanhToan', width: 25, style: { numFmt: '#,##0' } }),
    new HeaderColumn({ header: 'Ghi chú', key: 'ghiChu', width: 15 }),
];

export const headersBangTinhTienKy2 = [
    new HeaderColumn({ header: 'Stt', key: 'stt', width: 10 }),
    new HeaderColumn({ header: 'Vị trí đất thuê', key: 'viTriThue', width: 20 }),
    new HeaderColumn({ header: 'Diện tích (m2)', key: 'dienTich', width: 20, style: { numFmt: '#,##0.00' } }),
    new HeaderColumn({ header: 'Đơn giá (đ/m2/năm)', key: 'donGia', width: 20, style: { numFmt: '#,##0' } }),
    new HeaderColumn({ header: 'Thành tiền (đồng)', key: 'tongTien', width: 25, style: { numFmt: '#,##0' } }),
    new HeaderColumn(
        { header: 'Số phải nộp kỳ II (đồng)', key: 'tienKy', width: 25, style: { numFmt: '#,##0' } }
    ),
    new HeaderColumn(
        { header: 'Số đã nộp/được miễn, giảm (đồng)', key: 'daThanhToan', width: 25, style: { numFmt: '#,##0' } }
    ),
    new HeaderColumn({ header: 'Số còn phải nộp (đồng)', key: 'canThanhToan', width: 25, style: { numFmt: '#,##0' } }),
    new HeaderColumn({ header: 'Ghi chú', key: 'ghiChu', width: 15 }),
];
