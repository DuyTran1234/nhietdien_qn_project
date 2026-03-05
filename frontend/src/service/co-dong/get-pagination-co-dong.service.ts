import axios from "axios";
import type { CoDongModel } from "../../model/co-dong.model";
import { BACKEND_URL } from "../../common/common";

export default async function getPaginationCoDongService(
    sortDto?: any, limit?: number, page?: number, filterCntc?: number, filterType?: number,
    searchCoDong?: string, filterCoDongLon?: boolean
): Promise<{ list: CoDongModel[], total: number }> {
    const res = await axios<{ list: CoDongModel[], total: number }>(
        `${BACKEND_URL}/co-dong/get-pagination-co-dong`,
        {
            method: 'POST',
            params: {
                limit, page, filterCntc, filterType, searchCoDong, filterCoDongLon,
            },
            data: sortDto,
        }
    );

    return res.data;
}