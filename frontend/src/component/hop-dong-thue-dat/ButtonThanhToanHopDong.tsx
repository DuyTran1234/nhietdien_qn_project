import { DollarCircleOutlined } from "@ant-design/icons";
import { Button, message, Popconfirm } from "antd";
import dayjs from "dayjs";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { HopDongThueDatModel } from "../../model/hop-dong-thue-dat.model";
import type { ThanhToanHopDongModel } from "../../model/thanh-toan-hop-dong.model";
import createThanhToanHopDongService from "../../service/thanh-toan-hop-dong/create-thanh-toan-hop-dong.service";
import Loading from "../loading/Loading";

export default function ButtonThanhToanHopDong(
    { hopDong, ky }: { hopDong: HopDongThueDatModel, ky: number }
) {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const handleClick = async () => {
        const i = ky - 1;
        const createDto = {
            hopDongUUID: hopDong.hopDongUUID,
            ky: ky,
            loaiNop: 1,
            ngayThanhToan: dayjs().format("YYYY-MM-DD"),
            tienThanhToan: hopDong.chiTietCacKy[i]?.tongSoTien - hopDong.chiTietCacKy[i]?.daThanhToan,
        } as ThanhToanHopDongModel;
        try {
            setIsLoading(true);
            await createThanhToanHopDongService(createDto);
            message.success("Thanh toán thành công");
        } catch (error) {
            message.error("Lỗi thanh toán");
        } finally {
            setIsLoading(false);
            navigate(0);
        }
    }

    return (
        <div style={{ paddingTop: 5 }}>
            <Loading isLoading={isLoading} />
            <Popconfirm
                title="Thanh toán"
                description="Bạn có muốn thanh toán tiền thuê không?"
                onConfirm={handleClick}
                okText="Có"
                cancelText="Không"
                okButtonProps={{ danger: true }} // Nút xác nhận màu đỏ
            >
                <Button
                    type="primary"
                    icon={<DollarCircleOutlined />}
                    style={{ backgroundColor: '#1a80c4', borderColor: '#1a80c4' }}
                >
                    Thanh toán
                </Button>
            </Popconfirm>

        </div>
    );
}