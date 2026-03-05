import { useEffect, useState } from "react";
import Loading from "../loading/Loading";
import { useNavigate, useParams } from "react-router-dom";
import { message } from "antd";
import { HOP_DONG_THUE_DAT_PATHS, PATHS } from "../../paths/paths";
import { deleteHopDongThueDatByIdService, deleteHopDongThueDatByUuidService } from "../../service/hop-dong-thue-dat/delete-hop-dong-thue-dat.service";

export default function DeleteHopDongThueDat() {
    const { id, uuid } = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchApi = async () => {
            let path = `${PATHS.LIST_HOP_DONG}`;
            try {
                setIsLoading(true);
                if (id) {
                    const res = await deleteHopDongThueDatByIdService(Number(id));
                    path = `${HOP_DONG_THUE_DAT_PATHS.VIEW}/${res.hopDongUUID}`;
                }
                if (uuid) {
                    await deleteHopDongThueDatByUuidService(uuid);
                }
            } catch (error) {
                message.error('Lỗi không thể xóa hợp đồng');
            } finally {
                setIsLoading(false);
                navigate(path);
                message.success("Xóa hợp đồng thành công!");
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