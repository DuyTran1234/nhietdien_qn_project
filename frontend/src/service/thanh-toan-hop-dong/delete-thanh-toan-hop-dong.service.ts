import axios from "axios";
import { BACKEND_URL } from "../../common/common";

export default async function deleteThanhToanHopDongService(id: number) {
    const res = await axios.delete(
        `${BACKEND_URL}/thanh-toan-hop-dong/delete/${id}`,
    );
    return res.data;
}