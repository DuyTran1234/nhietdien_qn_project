import { ArrowLeftOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Card, Layout, message, Select, Space, Table } from "antd";
import Text from "antd/es/typography/Text";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import type { ThanhToanHopDongModel } from "../../model/thanh-toan-hop-dong.model";
import { HOP_DONG_THUE_DAT_PATHS, THANH_TOAN_HOP_DONG_PATHS } from "../../paths/paths";
import getListThanhToanHopDong from "../../service/thanh-toan-hop-dong/get-list-thanh-toan-hop-dong.service";
import Loading from "../loading/Loading";
import { columnsListThanhToanHopDong } from "./columnsListThanhToanHopDong";

export default function ListThanhToanHopDong() {
    const [isLoading, setIsLoading] = useState(false);
    const { uuid } = useParams();
    const [listThanhToan, setListThanhToan] = useState<ThanhToanHopDongModel[]>([]);
    const [year, setYear] = useState(dayjs().year());
    const [years, setYears] = useState(() => {
        const arr = [];
        for (let i = dayjs().year(); i >= 2025; --i) {
            arr.push(i);
        };
        return arr;
    });

    useEffect(() => {
        const fetchApi = async () => {
            try {
                setIsLoading(true);
                const rs = await getListThanhToanHopDong(String(uuid), year);
                setListThanhToan(rs);
            } catch (error) {
                message.error("Tải danh sách thanh toán thất bại!");
            } finally {
                setIsLoading(false);
            }
        };
        fetchApi();
    }, [year]);

    return (
        <div>
            <Loading isLoading={isLoading} />
            <Layout.Content>
                <Card
                    title="Lịch sử thanh toán" style={{ margin: '20px' }}
                    extra={
                        <Space>
                            <Text>Năm:</Text>
                            <Select
                                defaultValue={year}
                                style={{ width: 120 }}
                                onChange={(value) => {
                                    setYear(value);
                                }}
                                options={years.map(y => ({ label: `${y}`, value: y }))}
                            />
                            <Link to={`${THANH_TOAN_HOP_DONG_PATHS.CREATE}/${uuid}`}>
                                <Button
                                    type="primary"
                                    icon={<PlusOutlined />}
                                >
                                    Tạo thanh toán mới
                                </Button>
                            </Link>

                            <Link to={`${HOP_DONG_THUE_DAT_PATHS.VIEW}/${uuid}`}>
                                <Button
                                    style={{ backgroundColor: 'black', borderColor: 'white' }}
                                    type="primary"
                                    icon={<ArrowLeftOutlined />}
                                >
                                    Quay lại
                                </Button>
                            </Link>
                        </Space>
                    }
                >
                    <Table
                        columns={columnsListThanhToanHopDong}
                        dataSource={listThanhToan}
                        pagination={{
                            total: listThanhToan.length,
                            pageSize: listThanhToan.length, // Số dòng trên mỗi trang
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