import { message } from "antd";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../loading/Loading";
import deleteThueSuatDatService from "../../service/thue-suat-dat/delete-thue-suat-dat.service";
import { PATHS } from "../../paths/paths";

export default function DeleteThueSuatDat() {
    const { id } = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchApi = async () => {
            try {
                setIsLoading(true);
                await deleteThueSuatDatService(Number(id));
                setIsLoading(false);
                message.success('Xóa bản ghi thuế suất đất thành công!');
            } catch (error) {
                message.error('Xóa bản ghi thuế suất đất thất bại')
            } finally {
                navigate(PATHS.LIST_TAX);
            }
        }
        fetchApi();
    }, []);
    return (
        <div>
            <Loading isLoading={isLoading} />
        </div>
    );
}