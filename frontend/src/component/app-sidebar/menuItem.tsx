import { DashboardOutlined, EnvironmentOutlined, FileTextOutlined, SearchOutlined, SettingOutlined, TeamOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { APP_SIDEBAR_KEYS } from "./enum";

type MenuItem = Required<MenuProps>['items'][number];

export const appSidebarItems: MenuItem[] = [
    {
        key: APP_SIDEBAR_KEYS.TONG_QUAN,
        icon: <DashboardOutlined />,
        label: 'Tổng quan',
    },
    {
        key: APP_SIDEBAR_KEYS.QUAN_LY_HOP_DONG,
        icon: <FileTextOutlined />,
        label: 'Quản lý Hợp đồng',
        children: [
            {
                key: APP_SIDEBAR_KEYS.LIST_HOP_DONG,
                icon: <EnvironmentOutlined />,
                label: 'Hợp đồng Thuê đất'
            },
            {
                key: APP_SIDEBAR_KEYS.LIST_TAX,
                icon: <SettingOutlined />,
                label: 'Danh sách Thuế suất'
            },
            // {
            //     key: APP_SIDEBAR_KEYS.LIST_HOP_DONG_HET_HAN,
            //     icon: <ClockCircleOutlined />,
            //     label: 'Theo dõi Hết hạn'
            // },
        ],
    },
    {
        key: APP_SIDEBAR_KEYS.CO_DONG_CO_TUC,
        icon: <TeamOutlined />,
        label: 'Cổ đông & Cổ tức',
        children: [
            { key: APP_SIDEBAR_KEYS.LIST_CO_DONG, icon: <SearchOutlined />, label: 'Danh sách cổ đông' },
            { key: APP_SIDEBAR_KEYS.LIST_CO_TUC, icon: <EnvironmentOutlined />, label: 'Danh sách cổ tức' },
        ],
    },
];