import { PlusOutlined } from "@ant-design/icons";
import { Button, Card, Input, Layout, message, Space, Table } from "antd";
import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import type { HopDongThueDatModel } from "../../model/hop-dong-thue-dat.model";
import { HOP_DONG_THUE_DAT_PATHS } from "../../paths/paths";
import getPaginationHopDongThueDatService from "../../service/hop-dong-thue-dat/get-pagination-hop-dong-thue-dat.service";
import AppSidebar from "../app-sidebar/AppSidebar";
import { APP_SIDEBAR_KEYS, APP_SIDEBAR_STYLE } from "../app-sidebar/enum";
import Loading from "../loading/Loading";
import { columnsListHopDongThueDat } from "./columnsListHopDongThueDat";
import { debounce } from "lodash";
import ButtonXuatBieuMau from "./ButtonXuatBieuMau";

export default function ListHopDongThueDat() {
    const [pagination, setPagination] = useState({
        page: 0, // Antd dùng 1-based index cho UI
        limit: 5,
        findHD: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const [resultListHopDong, setResultListHopDong]
        = useState<{ list: HopDongThueDatModel[], total: number }>();

    const debounceSearch = useCallback(debounce((value: string) => {
        setPagination((prev) => { return { ...prev, page: 0, findHD: value } })
    }, 500), []);


    useEffect(() => {
        const fetchApi = async () => {
            try {
                setIsLoading(true);
                await new Promise(resolve => setTimeout(resolve, 500));
                const rs = await getPaginationHopDongThueDatService(
                    pagination.limit, pagination.page, pagination.findHD, { apDungDonGiaDate: "desc" }
                );
                setResultListHopDong(rs);
            } catch (error) {
                message.error('Không thể tải danh sách hợp đồng thuê đất');
            } finally {
                setIsLoading(false);
            }
        }
        fetchApi();
    }, [pagination]);

    return (
        <div>
            <Loading isLoading={isLoading} />
            <AppSidebar defaultSelectedKey={`${APP_SIDEBAR_KEYS.LIST_HOP_DONG}`} />
            <Layout.Content
                style={{
                    marginLeft: APP_SIDEBAR_STYLE.width,
                }}
            >
                <Card
                    title="Danh sách Hợp đồng thuê đất" style={{ margin: '20px' }}
                    extra={
                        <Space size="middle">
                            <ButtonXuatBieuMau />
                            <Link to={`${HOP_DONG_THUE_DAT_PATHS.CREATE_ROUTE}`}>
                                <Button
                                    type="primary"
                                    icon={<PlusOutlined />}
                                >
                                    Tạo hợp đồng mới
                                </Button>
                            </Link>
                            <Input.Search
                                placeholder="Tìm kiếm số hợp đồng"
                                allowClear
                                enterButton="Tìm kiếm"
                                size="large"
                                onChange={(e) => debounceSearch(e.target.value)}
                                style={{ width: 300 }}
                            />
                        </Space>
                    }
                >
                    <Table
                        rowKey="id"
                        columns={columnsListHopDongThueDat}
                        dataSource={resultListHopDong?.list}
                        pagination={{
                            total: resultListHopDong?.total,
                            current: pagination.page + 1,
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