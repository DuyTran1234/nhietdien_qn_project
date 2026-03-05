import { ClockCircleOutlined, FileTextOutlined, TeamOutlined } from "@ant-design/icons";
import tongQuanHopDongService from "../../service/hop-dong-thue-dat/tong-quan-hop-dong.service";
import type { JSX } from "react";
import tongQuanCoTucService from "../../service/co-tuc/tong-quan-co-tuc.service";

export interface DashboardStatProps {
    title: string;
    value: string;
    icon: JSX.Element;
    bgColor: string;
    borderColor: string;
}

export async function dashboardHopDongstats(): Promise<DashboardStatProps[]> {
    const rs = await tongQuanHopDongService();
    return [
        {
            title: 'Tổng số Hợp đồng',
            value: rs?.total,
            icon: <FileTextOutlined style={{ color: '#1890ff', marginRight: 10 }} />,
            bgColor: '#e6f7ff',
            borderColor: '#91d5ff',
        },
        {
            title: 'Thanh toán Kỳ 1',
            value: rs?.ky1,
            icon: <ClockCircleOutlined style={{ color: '#faad14', marginRight: 10 }} />,
            bgColor: '#fffbe6',
            borderColor: '#ffe58f',
        },
        {
            title: 'Thanh toán Kỳ 2',
            value: rs?.ky2,
            icon: <ClockCircleOutlined style={{ color: '#faad14', marginRight: 10 }} />,
            bgColor: '#fffbe6',
            borderColor: '#ffe58f',
        },
        {
            title: 'Thanh toán bổ sung',
            value: rs?.boSung,
            icon: <ClockCircleOutlined style={{ color: '#faad14', marginRight: 10 }} />,
            bgColor: '#fffbe6',
            borderColor: '#ffe58f',
        },
    ];
}

export async function dashboardStatsCoTuc() {
    const rs = await tongQuanCoTucService();
    return [
        {
            title: 'Tổng số Cổ đông nhận cổ tức',
            value: rs.total,
            icon: <TeamOutlined style={{ color: '#1890ff', marginRight: 10 }} />,
            bgColor: '#e6f7ff',
            borderColor: '#91d5ff',
        },
        {
            title: 'Thanh toán Chưa lưu ký',
            value: rs.thanhToanChuaLk,
            icon: <ClockCircleOutlined style={{ color: '#faad14', marginRight: 10 }} />,
            bgColor: '#fffbe6',
            borderColor: '#ffe58f',
        },
        {
            title: 'Thanh toán Đã lưu ký',
            value: rs.thanhToanDaLk,
            icon: <ClockCircleOutlined style={{ color: '#faad14', marginRight: 10 }} />,
            bgColor: '#fffbe6',
            borderColor: '#ffe58f',
        },
    ];
}