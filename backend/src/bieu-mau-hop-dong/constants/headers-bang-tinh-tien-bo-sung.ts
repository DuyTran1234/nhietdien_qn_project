import { HeaderColumn } from "../model/header-column.model";

export const headersBangTinhTienBoSung = [
    new HeaderColumn({ header: 'Stt', key: 'stt', width: 10 }),
    new HeaderColumn({ header: 'Hạng mục', key: 'viTriThue', width: 25 }),
    new HeaderColumn({ header: 'Hợp đồng số', key: 'soHopDong', width: 20 }),
    new HeaderColumn(
        { header: 'Diện tích (m2)', key: 'dienTich', width: 20, style: { numFmt: '#,##0.00' } }
    ),
    new HeaderColumn(
        { header: 'Đơn giá cũ (đ/m2/năm)', key: 'olderDonGia', width: 15, style: { numFmt: '#,##0' } }
    ),
    new HeaderColumn({ header: 'Số tháng', key: 'olderMonthUsed', width: 10 }),
    new HeaderColumn(
        { header: 'Thành tiền (đồng)', key: 'olderTongTien', width: 25, style: { numFmt: '#,##0' } }
    ),
    new HeaderColumn(
        { header: 'Đơn giá mới (đ/m2/năm)', key: 'newestDonGia', width: 15, style: { numFmt: '#,##0' } }
    ),
    new HeaderColumn({ header: 'Số tháng', key: 'newestMonthUsed', width: 10 }),
    new HeaderColumn(
        { header: 'Thành tiền (đồng)', key: 'newestTongTien', width: 25, style: { numFmt: '#,##0' } }
    ),
    new HeaderColumn(
        { header: ' Số phải nộp bổ sung', key: 'tienBoSung', width: 25, style: { numFmt: '#,##0' } }
    ),
    new HeaderColumn({ header: 'Ghi chú', key: 'ghiChu', width: 10 }),
];