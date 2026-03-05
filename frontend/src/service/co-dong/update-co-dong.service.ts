import axios from "axios";
import { BACKEND_URL } from "../../common/common";
import type { CoDongModel } from "../../model/co-dong.model";

export default async function UpdateCoDongService(updateDto: CoDongModel) {
    const res = await axios(
        `${BACKEND_URL}/co-dong/update-co-dong`,
        {
            method: 'patch',
            data: updateDto,
        }
    );
    return res.data;
}