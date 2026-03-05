import { DollarCircleOutlined } from "@ant-design/icons";
import { Button, message, Popconfirm } from "antd";
import dayjs from "dayjs";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { HopDongThueDatModel } from "../../model/hop-dong-thue-dat.model";
import type { ThanhToanHopDongModel } from "../../model/thanh-toan-hop-dong.model";
import createThanhToanTaxService from "../../service/thanh-toan-tax/create-thanh-toan-tax.service";
import Loading from "../loading/Loading";

export default function ButtonThanhToanTax(
    { hopDong }: { hopDong: HopDongThueDatModel }
) {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const handleClick = async () => {
        const total = hopDong.chiTietNopTax.newestAmount + hopDong.chiTietNopTax.olderAmount;
        const createDto = {
            hopDongUUID: hopDong.hopDongUUID,
            ngayThanhToan: dayjs().format("YYYY-MM-DD"),
            tienThanhToan: total - hopDong.chiTietNopTax.daThanhToan,
        } as ThanhToanHopDongModel;
        try {
            setIsLoading(true);
            await createThanhToanTaxService(createDto);
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