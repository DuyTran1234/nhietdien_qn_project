import { useEffect, useState } from "react";
import Loading from "../loading/Loading";
import { useNavigate, useParams } from "react-router-dom";
import { message } from "antd";
import { PATHS } from "../../paths/paths";
import DeleteCoDongById from "../../service/co-dong/delete-co-dong-by-id.service";

export default function DeleteCoDong() {
    const [isLoading, setIsLoading] = useState(false);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchApi = async () => {
            try {
                setIsLoading(true);
                await DeleteCoDongById(Number(id ?? -1));
                message.success('Xóa cổ đông thành công');
            } catch (error) {
                message.error('Lỗi không thể xóa cổ đông');
            } finally {
                setIsLoading(false);
                navigate(`${PATHS.LIST_CO_DONG}`)
            }
        };
        fetchApi();
    }, []);

    return (<div>
        <Loading isLoading={isLoading} />
    </div>);
}