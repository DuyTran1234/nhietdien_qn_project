import { useEffect, useState } from "react";
import Loading from "../loading/Loading";
import { useNavigate, useParams } from "react-router-dom";
import deleteThanhToanTaxService from "../../service/thanh-toan-tax/delete-thanh-toan-tax-by-id.service";
import { THANH_TOAN_TAX_PATHS } from "../../paths/paths";
import { message } from "antd";

export default function DeleteThanhToanTax() {
    const [isLoading, setIsLoading] = useState(false);
    const { id, uuid } = useParams();
    const navigate = useNavigate();
    useEffect(() => {
        const fetchApi = async () => {
            setIsLoading(true);
            try {
                await deleteThanhToanTaxService(Number(id ?? -1));
                message.success('Xóa thanh toán thành công');
            } catch (error) {
                message.error('Xóa thanh toán thất bại');
            } finally {
                setIsLoading(false);
                navigate(`${THANH_TOAN_TAX_PATHS.VIEW}/${uuid}`);
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