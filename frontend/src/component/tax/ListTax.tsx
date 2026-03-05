import { Button, Card, Layout, Table } from "antd";
import AppSidebar from "../app-sidebar/AppSidebar";
import { APP_SIDEBAR_KEYS, APP_SIDEBAR_STYLE } from "../app-sidebar/enum";
import { columnsListTaxType } from "./columnsListTax";
import { useEffect, useState } from "react";
import type { ThueSuatDatModel } from "../../model/thue-suat-dat.model";
import listThueSuatDatService from "../../service/thue-suat-dat/list-thue-suat-dat.service";
import Loading from "../loading/Loading";
import { PlusOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { THUE_SUAT_DAT_PATHS } from "../../paths/paths";

export default function ListTax() {
    const [resultThueSuat, setResultThueSuat] = useState<{
        list: ThueSuatDatModel[],
        total: number,
    }>({ list: [], total: 0 });
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        const fetchApi = async () => {
            const rs = await listThueSuatDatService();
            setIsLoading(false);
            setResultThueSuat(rs);
        }
        fetchApi();
    }, []);
    return (
        <div>
            <Loading isLoading={isLoading} />
            <AppSidebar defaultSelectedKey={`${APP_SIDEBAR_KEYS.LIST_TAX}`} />
            <Layout.Content
                style={{
                    marginLeft: APP_SIDEBAR_STYLE.width,
                    paddingLeft: 35,
                    paddingTop: 40,
                }}
            >
                <Card
                    title="Danh sách Thuế suất" style={{ margin: '20px' }}
                    extra={
                        <Link to={`${THUE_SUAT_DAT_PATHS.CREATE_ROUTE}`}>
                            <Button
                                type="primary"
                                icon={<PlusOutlined />}
                                onClick={() => console.log('Mở modal tạo mới')}
                            >
                                Tạo thuế suất mới
                            </Button>
                        </Link>
                    }
                >
                    <Table
                        columns={columnsListTaxType}
                        dataSource={resultThueSuat?.list}
                        pagination={{
                            total: resultThueSuat?.total,
                            pageSize: resultThueSuat?.total, // Số dòng trên mỗi trang
                            showSizeChanger: false, // Cho phép người dùng chọn số dòng hiển thị
                            showQuickJumper: false,
                            // pageSizeOptions: ['10', '20', '50'],
                            showTotal: (total) => `Tổng cộng ${total} mục`,
                        }}
                    />
                </Card>
            </Layout.Content>
        </div>
    );
}