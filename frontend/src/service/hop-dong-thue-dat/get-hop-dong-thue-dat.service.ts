import axios from "axios";
import type { HopDongThueDatModel } from "../../model/hop-dong-thue-dat.model";
import { BACKEND_URL } from "../../common/common";

export default async function getHopDongThueDatService(
    uuid?: string, sortDto?: any
): Promise<HopDongThueDatModel[]> {
    const res = await axios<HopDongThueDatModel[]>(
        `${BACKEND_URL}/hop-dong-thue-dat/get/${uuid}`,
        {
            method: 'post',
            data: sortDto,
        }
    )
    return res.data;
}