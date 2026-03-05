import axios from "axios";
import type { ThanhToanHopDongModel } from "../../model/thanh-toan-hop-dong.model";
import { BACKEND_URL } from "../../common/common";

export default async function getListThanhToanHopDong(
    uuid: string, year: number
): Promise<ThanhToanHopDongModel[]> {
    const res = await axios.get<ThanhToanHopDongModel[]>(
        `${BACKEND_URL}/thanh-toan-hop-dong/get-by-uuid`, {
        params: { uuid, year },
    });
    return res.data
}