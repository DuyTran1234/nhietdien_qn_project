import { DownOutlined, FileExcelOutlined } from "@ant-design/icons";
import { Button, Dropdown, Space } from "antd";
import { XUAT_BIEU_MAU_PATHS } from "../../paths/paths";
import { Link } from "react-router-dom";

export default function ButtonXuatBieuMau() {
    const items = [
        {
            key: '1',
            label: <Link to={XUAT_BIEU_MAU_PATHS.bangTheoDoi}>Xuất bảng theo dõi</Link>,
        },
        {
            key: '2',
            label: <Link to={XUAT_BIEU_MAU_PATHS.bangTinhTienKy1}>Xuất bảng tính tiền kỳ 1</Link>,
        },
        {
            key: '3',
            label: <Link to={XUAT_BIEU_MAU_PATHS.bangTinhTienKy2}>Xuất bảng tính tiền kỳ 2</Link>,
        },
        {
            key: '4',
            label: <Link to={XUAT_BIEU_MAU_PATHS.keHoachNopTienThueDat}>Xuất kế hoạch nộp tiền thuê đất</Link>,
        },
        {
            key: '5',
            label: <Link to={XUAT_BIEU_MAU_PATHS.keHoachNopTax}>Xuất kế hoạch nộp tax</Link>,
        },
        {
            key: '6',
            label: <Link to={XUAT_BIEU_MAU_PATHS.tinhTienTax}>Xuất bảng tính tiền tax</Link>,
        },
        {
            key: '7',
            label: <Link to={XUAT_BIEU_MAU_PATHS.nopBoSungThueDat}>Xuất bảng nộp bổ sung thuê đất</Link>,
        },
    ];

    return (
        <div>
            <Dropdown
                menu={{ items }}
                trigger={['click']} // Ấn vào mới xổ ra
                placement="bottomRight" // Xổ xuống bên phải cho đẹp
            >
                <Button
                    type="primary"
                    style={{
                        backgroundColor: '#1D6F42', // Màu xanh đặc trưng của Excel
                        borderColor: '#1D6F42'
                    }}
                    icon={<FileExcelOutlined />} // Icon tài liệu/excel
                >
                    <Space>
                        Xuất biểu mẫu
                        <DownOutlined style={{ fontSize: '12px' }} />
                    </Space>
                </Button>
            </Dropdown>
        </div>
    );
}