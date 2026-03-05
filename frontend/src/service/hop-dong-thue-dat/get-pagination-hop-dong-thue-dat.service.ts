import axios from "axios";
import type { HopDongThueDatModel } from "../../model/hop-dong-thue-dat.model";
import { BACKEND_URL } from "../../common/common";

export default async function getPaginationHopDongThueDatService(
    limit?: number, page?: number, findHD?: string, sortDto?: any
): Promise<{ list: HopDongThueDatModel[], total: number }> {
    const res = await axios<{ list: HopDongThueDatModel[], total: number }>({
        method: 'post',
        url: `${BACKEND_URL}/hop-dong-thue-dat/get-pagination`,
        params: {
            limit: limit,
            page: page,
            findHD: findHD,
        },
        data: sortDto,
    });
    return res.data;
}