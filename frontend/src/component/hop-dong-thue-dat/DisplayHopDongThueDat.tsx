import { CloseOutlined, DeleteOutlined, DollarOutlined, EditOutlined, FileTextOutlined, HistoryOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { Button, Card, Collapse, Divider, message, Space, Tag } from "antd";
import Text from "antd/es/typography/Text";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import type { HopDongThueDatModel } from "../../model/hop-dong-thue-dat.model";
import getHopDongThueDatService from "../../service/hop-dong-thue-dat/get-hop-dong-thue-dat.service";
import { renderContractDetails } from "./renderHopDongThueDat";
import Loading from "../loading/Loading";
import { HOP_DONG_THUE_DAT_PATHS, PATHS, THANH_TOAN_HOP_DONG_PATHS, THANH_TOAN_TAX_PATHS } from "../../paths/paths";

export default function DisplayHopDongThueDat() {
    const { uuid } = useParams();
    const [newestContract, setNewestContract] = useState<HopDongThueDatModel>();
    const [historyContracts, setHistoryContracts] = useState<HopDongThueDatModel[]>();
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchApi = async () => {
            try {
                setIsLoading(true);
                await new Promise((resolve) => setTimeout(resolve, 500));
                const data = await getHopDongThueDatService(uuid, { apDungDonGiaDate: "desc" });
                const [newest, ...rest] = data;
                setNewestContract(newest);
                setHistoryContracts(rest);
            } catch (error) {
                message.error("Không thể tải dữ liệu hợp đồng");
                navigate(PATHS.LIST_HOP_DONG);
            } finally {
                setIsLoading(false);
            }
        };
        fetchApi();
    }, []);

    return (
        <div style={{ padding: '20px', maxWidth: '80%', margin: '0 auto' }}>
            {/* Hợp đồng mới nhất */}
            <Loading isLoading={isLoading} />
            <Card
                title={
                    <Space>
                        <Link to={`${PATHS.LIST_HOP_DONG}`}>
                            <Button
                                type="text"
                                icon={<CloseOutlined style={{ color: 'red', fontSize: 30 }} />}
                            />
                        </Link>
                        <FileTextOutlined />
                        <span>Thông tin hợp đồng hiện tại</span>
                        <Tag color="gold">MỚI NHẤT</Tag>
                    </Space>
                }
                extra={
                    <Space size="middle">
                        <Link
                            to={`${THANH_TOAN_HOP_DONG_PATHS.VIEW}/${newestContract?.hopDongUUID}`}
                        >
                            <Button
                                type="primary"
                                icon={<DollarOutlined />}
                                style={{ backgroundColor: '#14d3e0', borderColor: '#14d3e0' }}
                            >
                                Thanh toán thuê đất
                            </Button>
                        </Link>
                        <Link
                            to={`${THANH_TOAN_TAX_PATHS.VIEW}/${newestContract?.hopDongUUID}`}
                        >
                            <Button
                                type="primary"
                                icon={<DollarOutlined />}
                                style={{ backgroundColor: '#d614e0', borderColor: '#d614e0' }}
                            >
                                Thanh toán thuế
                            </Button>
                        </Link>
                        <Link
                            to={`${HOP_DONG_THUE_DAT_PATHS.CREATE_NEWEST}/${newestContract?.hopDongUUID}`}
                        >
                            <Button
                                type="primary"
                                icon={<PlusCircleOutlined />}
                                onClick={() => { }}
                                style={{ backgroundColor: '#52c41a', borderColor: '#52c41a' }} // Màu xanh lá cho nổi bật
                            >
                                Tạo hợp đồng nối mới
                            </Button>
                        </Link>
                        <Link
                            to={`${HOP_DONG_THUE_DAT_PATHS.UPDATE}/${newestContract?.hopDongUUID}`}
                        >
                            <Button
                                type="primary"
                                icon={<EditOutlined />}
                                onClick={() => { }}
                                style={{ backgroundColor: '#f2b50a', borderColor: '#f2b50a' }}
                            >
                                Cập nhật hợp đồng
                            </Button>
                        </Link>
                        <Link
                            to={
                                historyContracts && historyContracts.length > 0 ?
                                    `${HOP_DONG_THUE_DAT_PATHS.DELETE_BY_ID}/${newestContract?.id}` :
                                    `${HOP_DONG_THUE_DAT_PATHS.DELETE_BY_UUID}/${newestContract?.hopDongUUID}`
                            }
                        >
                            <Button
                                type="primary"
                                icon={<DeleteOutlined />}
                                onClick={() => { }}
                                style={{ backgroundColor: 'red', borderColor: 'red' }}
                            >
                                Xóa hợp đồng
                            </Button>
                        </Link>
                        <Text type="secondary">ID: {newestContract?.id}</Text>
                    </Space>
                }
                style={{
                    marginBottom: '24px', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                }}
            >
                {renderContractDetails(newestContract, true)}
            </Card>

            {/* Lịch sử các hợp đồng cũ */}
            {historyContracts && historyContracts.length > 0 && (
                <Collapse
                    ghost
                    expandIconPlacement="start"
                    style={{ background: '#f5f5f5', borderRadius: '8px' }}
                >
                    <Collapse.Panel
                        header={
                            <Space>
                                <HistoryOutlined />
                                <Text strong>Lịch sử thay đổi ({historyContracts.length})</Text>
                            </Space>
                        }
                        key="1"
                    >
                        <Space direction="vertical" style={{ width: '100%' }} split={<Divider dashed style={{ margin: '12px 0' }} />}>
                            {historyContracts.map((item) => (
                                <div key={item.id}>
                                    <div style={{ marginBottom: '8px' }}>
                                        <Tag color="default">Phiên bản ID: {item.id}</Tag>
                                    </div>
                                    {renderContractDetails(item)}
                                </div>
                            ))}
                        </Space>
                    </Collapse.Panel>
                </Collapse>
            )}
        </div>
    );
}