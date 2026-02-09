import { HeaderColumn } from "../model/header-column.model";

export const headersBangTheoDoi = [
    new HeaderColumn({ header: 'Stt', key: 'stt', width: 10 }),
    new HeaderColumn({ header: 'Số hợp đồng/ngày tháng năm', key: 'soHopDong', width: 25 }),
    new HeaderColumn({ header: 'Quyết định cho thuê đất/ngày tháng năm', key: 'quyetDinhThueDat', width: 20 }),
    new HeaderColumn({ header: 'Đơn vị tính', key: 'unit', width: 10 }),
    new HeaderColumn({ header: 'Diện tích', key: 'dienTich', width: 15, style: { numFmt: '#,##0.00' } }),
    new HeaderColumn({ header: 'Thời gian thuê', key: 'thoiGianThue', width: 20 }),
    new HeaderColumn({ header: 'Mục đích thuê', key: 'mucDichThue', width: 30 }),
    new HeaderColumn({ header: 'Khu vực thuê', key: 'khuVucThue', width: 15 }),
    new HeaderColumn(
        { header: 'Đơn giá thuê đất', key: 'donGiaThueDat', width: 10, style: { numFmt: '#,##0' } }
    ),
    new HeaderColumn(
        { header: 'Quyết định đơn giá thuê đất/ngày tháng năm', key: 'quyetDinhDonGia', width: 15 }
    ),
    new HeaderColumn({ header: 'Thời gian ổn định đơn giá', key: 'onDinhDonGia', width: 20 }),
    new HeaderColumn({ header: 'Ghi chú', key: 'note', width: 15 }),
];