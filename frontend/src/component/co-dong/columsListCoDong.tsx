import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Space } from "antd";
import type { ColumnsType } from "antd/es/table";
import { Link } from "react-router-dom";
import { vietNamFormatter } from "../../common/numberFormat";
import type { CoDongModel } from "../../model/co-dong.model";
import { CO_DONG_PATHS } from "../../paths/paths";

export const columnsListCoDong: ColumnsType<CoDongModel> = [
    {
        title: 'Thông tin cổ đông',
        dataIndex: 'hoTen',
        key: 'hoTen',
        width: 400,
        render: (_, v) => {
            return (
                <div>
                    <p><b>Họ tên: </b>{v.hoTen}</p>
                    <p><b>Địa chỉ: </b>{v.diaChi}</p>
                    <p><b>Email: </b>{v.email}</p>
                    <p><b>Điện thoại: </b>{v.dienThoai}</p>
                    <p><b>Quốc tịch: </b>{v.quocTich}</p>
                </div>
            );
        }
    },
    {
        title: 'Số DKSH',
        dataIndex: 'soDKSH',
        key: 'soDKSH',
        width: 200,
        render: (_, v) => {
            return (
                <div>
                    <p><b>Số DKSH: </b>{v.soDKSH}</p>
                    <p><b>Ngày cấp: </b></p>
                    {
                        v.ngayCap.map((item) => {
                            return (
                                <p>{` - ${item}`}</p>
                            )
                        })
                    }
                    <p><b>Số lần cấp sổ: </b>{v.ngayCap.length}</p>
                </div>
            );
        }
    },
    {
        title: 'Tổng SLCKNG',
        dataIndex: "slckngCong",
        key: 'slckngCong',
        width: 150,
        render: (_, v) => {
            return (
                <div>
                    <p>{vietNamFormatter(v.slckngCong)}</p>
                </div>
            );
        }
    },
    {
        title: 'Loại',
        dataIndex: "type",
        key: 'type',
        width: 200,
        render: (_, v) => {
            return (<div>
                <p><b>Trong nước/Ngoài nước: </b>{v.type === 1 ? 'Trong nước' : 'Ngoài nước'}</p>
                <p><b>Cá nhân/Tổ chức: </b>{v.cntc === 1 ? 'Cá nhân' : 'Tổ chức'}</p>
            </div>);
        }
    },
    {
        title: 'TXNUM',
        dataIndex: "txnum",
        key: 'txnum',
    },
    {
        title: 'Ghi chú',
        dataIndex: "ghiChu",
        key: 'ghiChu',
    },
    {
        title: 'Hành động',
        key: 'action',
        width: 210,
        render: (_, record) => (
            <Space size="middle">
                <Link to={`${CO_DONG_PATHS.UPDATE}/${record.id}`}>
                    <Button type="link">
                        <EditOutlined style={{ fontSize: 24 }} />
                    </Button>
                </Link>

                <Link to={`${CO_DONG_PATHS.DELETE}/${record.id}`}>
                    <Button type="link">
                        <DeleteOutlined style={{ fontSize: 24, color: 'red' }} />
                    </Button>
                </Link>
            </Space>
        ),
    },

];