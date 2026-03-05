import axios from "axios";
import { BACKEND_URL } from "../../common/common";

export default async function CreateDanhSachCoDongService(formData: FormData) {
    const res = await axios(
        `${BACKEND_URL}/co-dong/create-danh-sach-co-dong`,
        {
            method: 'post',
            data: formData,
        }
    );

    return res.data;
}