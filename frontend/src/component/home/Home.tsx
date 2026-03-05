import { Card, Col, Layout, message, Row, Statistic } from "antd";
import Paragraph from "antd/es/typography/Paragraph";
import Title from "antd/es/typography/Title";
import { useEffect, useState } from "react";
import AppSidebar from "../app-sidebar/AppSidebar";
import { APP_SIDEBAR_KEYS, APP_SIDEBAR_STYLE } from "../app-sidebar/enum";
import Loading from "../loading/Loading";
import { dashboardHopDongstats, dashboardStatsCoTuc, type DashboardStatProps } from "./dashboardStats";
import dayjs from "dayjs";

export default function Home() {
    const [hopDongstats, setHopDongstats] = useState<DashboardStatProps[]>();
    const [coTucStats, setCoTucStats] = useState<DashboardStatProps[]>();
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        const fetchApi = async () => {
            try {
                setIsLoading(true);
                const dataHopDong = await dashboardHopDongstats();
                const dataCoTuc = await dashboardStatsCoTuc();
                setHopDongstats(dataHopDong);
                setCoTucStats(dataCoTuc);
            } catch (error) {
                message.error({
                    content: 'Không thể tìm thấy thông tin hợp đồng thuê đất',
                    duration: 3,
                });
            } finally {
                setIsLoading(false);
            }
        };
        fetchApi();
    }, [])

    return (
        <div style={{ width: '99%' }}>
            <Loading isLoading={isLoading} />
            <AppSidebar defaultSelectedKey={`${APP_SIDEBAR_KEYS.TONG_QUAN}`} />
            <Layout.Content
                style={{
                    marginLeft: APP_SIDEBAR_STYLE.width,
                    paddingLeft: 35,
                    paddingTop: 40,
                }}
            >
                <Title style={{ fontSize: 30 }}>Dashboard Tổng Quan</Title>
                <Paragraph style={{ fontSize: 20, marginTop: 60 }}>Tổng quan hợp đồng thuê đất</Paragraph>
                <Row gutter={[16, 16]} style={{ marginTop: 30 }}>
                    {hopDongstats?.map((item, index) => (
                        <Col xs={24} sm={12} md={6} key={index}>
                            <Card
                                variant="outlined"
                                style={{
                                    borderRadius: '15px',
                                    borderLeft: `5px solid ${item.borderColor}`, // Tạo vạch màu bên trái
                                    background: `linear-gradient(to right, ${item.bgColor}, #ffffff)` // Hiệu ứng đổ màu nhẹ
                                }}
                                styles={{
                                    body: {
                                        padding: '28px'
                                    }
                                }}
                            >
                                <Statistic
                                    title={<span style={{
                                        fontWeight: 'bold', color: '#555', fontSize: '18px'
                                    }}>{item.title}</span>}
                                    value={item.value}
                                    prefix={item.icon}
                                    styles={{ content: { fontSize: '22px', fontWeight: 'bold' } }}
                                />
                            </Card>
                        </Col>
                    ))}
                </Row>
                <Paragraph style={{ fontSize: 20, marginTop: 70 }}>Tổng quan danh sách cổ tức năm {`${dayjs().year()}`}</Paragraph>
                <Row gutter={[16, 16]} style={{ marginTop: 30 }}>
                    {coTucStats?.map((item, index) => (
                        <Col xs={24} sm={12} md={8} key={index}>
                            <Card
                                variant="outlined"
                                style={{
                                    borderRadius: '15px',
                                    borderLeft: `5px solid ${item.borderColor}`, // Tạo vạch màu bên trái
                                    background: `linear-gradient(to right, ${item.bgColor}, #ffffff)` // Hiệu ứng đổ màu nhẹ
                                }}
                                styles={{
                                    body: {
                                        padding: '28px'
                                    }
                                }}
                            >
                                <Statistic
                                    title={<span style={{
                                        fontWeight: 'bold', color: '#555', fontSize: '18px'
                                    }}>{item.title}</span>}
                                    value={item.value}
                                    prefix={item.icon}
                                    styles={{ content: { fontSize: '22px', fontWeight: 'bold' } }}
                                />
                            </Card>
                        </Col>
                    ))}
                </Row>

            </Layout.Content>
        </div>
    );
}