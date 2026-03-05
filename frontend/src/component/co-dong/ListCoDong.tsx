import { PlusOutlined } from "@ant-design/icons";
import { Button, Card, Form, Input, Layout, message, Space, Table } from "antd";
import { debounce } from "lodash";
import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import type { CoDongModel } from "../../model/co-dong.model";
import { CO_DONG_PATHS } from "../../paths/paths";
import getPaginationCoDongService from "../../service/co-dong/get-pagination-co-dong.service";
import AppSidebar from "../app-sidebar/AppSidebar";
import { APP_SIDEBAR_KEYS, APP_SIDEBAR_STYLE } from "../app-sidebar/enum";
import Loading from "../loading/Loading";
import { columnsListCoDong } from "./columsListCoDong";
import FilterListCoDong from "./FilterListCoDong";
import ImportExcelCoDong from "./ImportExcelCoDong";

export default function ListCoDong() {
    const [pagination, setPagination] = useState({
        page: 0, // Antd dùng 1-based index cho UI
        limit: 5,
        filterCntc: undefined,
        filterType: undefined,
        searchCoDong: "",
        filterCoDongLon: undefined,
    });
    const [form] = Form.useForm();
    const [isLoading, setIsLoading] = useState(false);
    const [resultCoDong, setResultCoDong] = useState<{ list: CoDongModel[], total: number }>();

    useEffect(() => {
        const fetchApi = async () => {
            try {
                setIsLoading(true);
                await new Promise((resolve) => setTimeout(resolve, 200));
                const data = await getPaginationCoDongService(
                    {}, pagination.limit, pagination.page, pagination.filterCntc, pagination.filterType,
                    pagination.searchCoDong, pagination.filterCoDongLon
                );
                setResultCoDong(data);
            } catch (error) {
                message.error('Không thể tải danh sách hợp đồng thuê đất');
            } finally {
                setIsLoading(false);
            }
        }
        fetchApi();
    }, [pagination]);

    const debounceSearch = useCallback(debounce((value: string) => {
        setPagination((prev) => { return { ...prev, page: 0, searchCoDong: value } })
    }, 500), []);

    return (
        <div>
            <Loading isLoading={isLoading} />
            <AppSidebar defaultSelectedKey={`${APP_SIDEBAR_KEYS.LIST_CO_DONG}`} />
            <Layout.Content
                style={{
                    marginLeft: APP_SIDEBAR_STYLE.width,
                }}
            >
                <Card
                    title="Danh sách cổ đông" style={{ margin: '20px' }}
                    extra={
                        <Space size="middle">
                            <Input.Search
                                placeholder="( Họ tên, DKSH, email, số điện thoại )"
                                allowClear
                                enterButton="Tìm kiếm"
                                size="large"
                                onChange={(e) => debounceSearch(e.target.value)}
                                style={{ width: 450 }}
                            />
                            <FilterListCoDong form={form} setPagination={setPagination} />
                            <ImportExcelCoDong setPagination={setPagination} />
                            <Link to={`${CO_DONG_PATHS.CREATE_ROUTE}`}>
                                <Button
                                    type="primary"
                                    icon={<PlusOutlined />}
                                >
                                    Tạo một cổ đông mới
                                </Button>

                            </Link>
                        </Space>
                    }
                >
                    <Table
                        rowKey="id"
                        columns={columnsListCoDong}
                        dataSource={resultCoDong?.list}
                        pagination={{
                            current: pagination.page + 1,
                            total: resultCoDong?.total,
                            pageSize: pagination.limit, // Số dòng trên mỗi trang
                            showSizeChanger: true, // Cho phép người dùng chọn số dòng hiển thị
                            showQuickJumper: true,
                            pageSizeOptions: [5, 10, 20, 50],
                            showTotal: (total) => `Tổng cộng ${total} mục`,
                        }}
                        onChange={(newPagination) => {
                            setPagination((prev) => {
                                return {
                                    ...prev,
                                    page: newPagination.current ? newPagination.current - 1 : pagination.page,
                                    limit: newPagination.pageSize ?? pagination.limit,
                                };
                            })
                        }}
                    />
                </Card >
            </Layout.Content >
        </div >
    );
}