import axios from "axios";
import type { CoDongModel } from "../../model/co-dong.model";
import { BACKEND_URL } from "../../common/common";

export default async function CreateCoDongService(createDto: CoDongModel) {
    const res = await axios<CoDongModel>(
        `${BACKEND_URL}/co-dong/create-co-dong`,
        {
            method: 'post',
            data: createDto
        }
    );
    return res.data;
}