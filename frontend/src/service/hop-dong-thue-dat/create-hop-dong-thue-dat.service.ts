import axios from "axios";
import type { HopDongThueDatModel } from "../../model/hop-dong-thue-dat.model";
import { BACKEND_URL } from "../../common/common";

export default async function CreateHopDongThueDatService(createDto: HopDongThueDatModel) {
    const res = await axios<HopDongThueDatModel>(
        `${BACKEND_URL}/hop-dong-thue-dat/create`,
        {
            method: 'post',
            data: createDto,
        }
    );
    return res.data;
}