import { Spin } from "antd";

export default function Loading({ isLoading }: { isLoading: boolean }) {
    return (
        <>
            <Spin
                spinning={isLoading} fullscreen size="large" description="Đang tải dữ liệu..."
            />
        </>
    );
};