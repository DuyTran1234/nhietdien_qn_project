import axios from "axios";
import type { ThueSuatDatModel } from "../../model/thue-suat-dat.model";
import { BACKEND_URL } from "../../common/common";

export default async function listThueSuatDatService(): Promise<{
    list: ThueSuatDatModel[],
    total: number
}> {
    const res = await axios.get<{ list: ThueSuatDatModel[], total: number }>(
        `${BACKEND_URL}/thue-suat-dat/get-pagination`,
        {
            params: {
                limit: 0,
                page: 0,
            }
        }
    );
    return res.data;
}