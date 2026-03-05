import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Space } from "antd";
import type { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import { vietNamFormatter } from "../../common/numberFormat";
import type { ThanhToanHopDongModel } from "../../model/thanh-toan-hop-dong.model";
import { THANH_TOAN_HOP_DONG_PATHS } from "../../paths/paths";

export const columnsListThanhToanHopDong: ColumnsType<ThanhToanHopDongModel> = [
    {
        title: 'Ngày thanh toán',
        dataIndex: 'ngayThanhToan',
        key: 'ngayThanhToan',
        render: (_, v) => {
            return (
                <div>
                    <p>{dayjs(v.ngayThanhToan).format("DD/MM/YYYY")}</p>
                </div>
            );
        }
    },
    {
        title: 'Kỳ',
        dataIndex: 'ky',
        key: 'ky',
        render: (_, v) => {
            const str = v.ky < 3 ? `Kỳ ${v.ky}` : `Bổ sung`;
            return (
                <div>
                    <p>{str}</p>
                </div>
            );
        }
    },
    {
        title: 'Tiền thanh toán',
        dataIndex: "tienThanhToan",
        key: 'tienThanhToan',
        render: (_, v) => {
            return `${vietNamFormatter(v.tienThanhToan)}đ`;
        }
    },
    {
        title: 'Loại nộp',
        dataIndex: 'loaiNop',
        key: 'loaiNop',
        render: (_, v) => {
            let str = "";
            if (v.loaiNop === 0) {
                str = "Trước hạn";
            } else if (v.loaiNop === 1) {
                str = "Đúng hạn";
            } else {
                str = "Bổ sung";
            }
            return (
                <div>
                    {str}
                </div>
            );
        }
    },
    {
        title: 'Ghi chú',
        dataIndex: "note",
        key: 'note',
    },
    {
        title: 'Hành động',
        key: 'action',
        width: 210,
        render: (_, record) => (
            <Space size="middle">
                <Link to={`${THANH_TOAN_HOP_DONG_PATHS.UPDATE}/${record.id}/${record.hopDongUUID}`}>
                    <Button type="link">
                        <EditOutlined style={{ fontSize: 24 }} />
                    </Button>
                </Link>

                <Link to={`${THANH_TOAN_HOP_DONG_PATHS.DELETE}/${record.id}/${record.hopDongUUID}`}>
                    <Button type="link">
                        <DeleteOutlined style={{ fontSize: 24, color: 'red' }} />
                    </Button>
                </Link>
            </Space>
        ),
    },
];