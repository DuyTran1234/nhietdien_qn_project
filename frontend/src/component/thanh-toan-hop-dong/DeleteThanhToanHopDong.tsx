import { useNavigate, useParams } from "react-router-dom";
import Loading from "../loading/Loading";
import { useEffect, useState } from "react";
import deleteThanhToanHopDongService from "../../service/thanh-toan-hop-dong/delete-thanh-toan-hop-dong.service";
import { message } from "antd";
import { THANH_TOAN_HOP_DONG_PATHS } from "../../paths/paths";

export default function DeleteThanhToanHopDong() {
    const { id, uuid } = useParams();
    const navigate = useNavigate();
    const [isLoading, setIsloading] = useState(false);

    useEffect(() => {
        const fetchApi = async () => {
            try {
                setIsloading(true);
                await deleteThanhToanHopDongService(id ? Number(id) : -1);
                message.success('Xóa thanh toán thành công');
            } catch (error) {
                message.error('Xóa thanh toán thất bại');
            } finally {
                setIsloading(false);
                navigate(`${THANH_TOAN_HOP_DONG_PATHS.VIEW}/${uuid}`);
            }
        };
        fetchApi();
    }, []);

    return (
        <div>
            <Loading isLoading={isLoading} />
        </div>
    );
}