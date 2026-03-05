import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Space } from "antd";
import type { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import { vietNamFormatter } from "../../common/numberFormat";
import type { ThanhToanTaxModel } from "../../model/thanh-toan-tax.model";
import { THANH_TOAN_TAX_PATHS } from "../../paths/paths";

export const columnsListThanhToanTax: ColumnsType<ThanhToanTaxModel> = [
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
        title: 'Tiền thanh toán',
        dataIndex: "tienThanhToan",
        key: 'tienThanhToan',
        render: (_, v) => {
            return `${vietNamFormatter(v.tienThanhToan)}đ`;
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
                <Link to={`${THANH_TOAN_TAX_PATHS.UPDATE}/${record.id}/${record.hopDongUUID}`}>
                    <Button type="link">
                        <EditOutlined style={{ fontSize: 24 }} />
                    </Button>
                </Link>

                <Link to={`${THANH_TOAN_TAX_PATHS.DELETE}/${record.id}/${record.hopDongUUID}`}>
                    <Button type="link">
                        <DeleteOutlined style={{ fontSize: 24, color: 'red' }} />
                    </Button>
                </Link>
            </Space>
        ),
    },

];