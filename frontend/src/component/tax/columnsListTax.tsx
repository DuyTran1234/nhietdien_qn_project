import { EditOutlined } from "@ant-design/icons";
import { Button, Space } from "antd";
import type { ColumnsType } from "antd/es/table";
import { Link } from "react-router-dom";
import type { ThueSuatDatModel } from "../../model/thue-suat-dat.model";
import { THUE_SUAT_DAT_PATHS } from "../../paths/paths";
import ButtonDeleteTax from "./ButtonDeleteTax";

export const columnsListTaxType: ColumnsType<ThueSuatDatModel> = [
    {
        title: 'Tên thuế suất',
        dataIndex: 'tenThueSuat',
        key: 'tenThueSuat',
    },
    {
        title: 'Mức thuế (%)',
        dataIndex: 'tax',
        key: 'tax',
    },
    {
        title: 'Hành động',
        key: 'action',
        render: (_, record) => (
            <Space size="middle">
                <Link to={`${THUE_SUAT_DAT_PATHS.UPDATE}/${record.id}`}>
                    <Button type="link">
                        <EditOutlined style={{ fontSize: 24 }} />
                    </Button>
                </Link>

                <ButtonDeleteTax id={record.id} />
            </Space>
        ),
    },
];