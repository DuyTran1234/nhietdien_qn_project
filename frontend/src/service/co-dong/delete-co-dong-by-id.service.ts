import axios from "axios";
import { BACKEND_URL } from "../../common/common";

export default async function DeleteCoDongById(id: number) {
    const res = await axios(
        `${BACKEND_URL}/co-dong/delete-co-dong/${id}`,
        {
            method: 'delete',
        }
    );
    return res.data;
}