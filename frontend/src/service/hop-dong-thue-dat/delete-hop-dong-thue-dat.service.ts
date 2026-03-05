import axios from "axios";
import { BACKEND_URL } from "../../common/common";
import type { HopDongThueDatModel } from "../../model/hop-dong-thue-dat.model";

export async function deleteHopDongThueDatByUuidService(uuid: string) {
    const res = await axios(
        `${BACKEND_URL}/hop-dong-thue-dat/delete-by-uuid/${uuid}`, {
        method: 'delete'
    });
    return res.data;
}

export async function deleteHopDongThueDatByIdService(id: number): Promise<HopDongThueDatModel> {
    const res = await axios(
        `${BACKEND_URL}/hop-dong-thue-dat/delete-by-id/${id}`, {
        method: 'delete'
    });
    return res.data;
}