import { Layout, Menu } from "antd";
import { useNavigate } from "react-router-dom";
import { appSidebarItems } from "./menuItem";
import { APP_SIDEBAR_STYLE } from "./enum";

function AppSidebar({ defaultSelectedKey }: { defaultSelectedKey: string }) {
    const navigate = useNavigate();
    return (
        <Layout>
            <Layout.Sider
                theme="light"
                width={APP_SIDEBAR_STYLE.width}
                style={{
                    minHeight: '100vh',
                    borderRight: '1px solid #f0f0f0',
                    position: "fixed",
                }}
            >
                <Menu
                    mode="inline"
                    defaultOpenKeys={['quan-ly-hop-dong', 'co-dong-co-tuc']}
                    defaultSelectedKeys={[defaultSelectedKey]}
                    style={{ borderRight: 0 }}
                    items={appSidebarItems}
                    onClick={({ key }) => {
                        navigate(`/${key}`);
                    }}
                />
            </Layout.Sider>

        </Layout>
    );
}
export default AppSidebar;