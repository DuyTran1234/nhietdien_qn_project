import axios from "axios";
import type { CoDongModel } from "../../model/co-dong.model";
import { BACKEND_URL } from "../../common/common";

export default async function GetCoDongByIdService(id: number) {
    const res = await axios.get<CoDongModel>(
        `${BACKEND_URL}/co-dong/get-co-dong/${id}`
    );
    return res.data;
}