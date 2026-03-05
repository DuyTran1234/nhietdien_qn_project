import axios from "axios";
import type { HopDongThueDatModel } from "../../model/hop-dong-thue-dat.model";
import { BACKEND_URL } from "../../common/common";

export default async function UpdateHopDongThueDatService(updateDto: HopDongThueDatModel) {
    const res = await axios<HopDongThueDatModel>(
        `${BACKEND_URL}/hop-dong-thue-dat/update`, {
        method: 'patch',
        data: updateDto,
    });
    return res.data;
}