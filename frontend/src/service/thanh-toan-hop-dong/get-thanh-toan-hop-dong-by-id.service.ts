import axios from "axios";
import type { ThanhToanHopDongModel } from "../../model/thanh-toan-hop-dong.model";
import { BACKEND_URL } from "../../common/common";

export default async function getThanhToanHopDongByIdService(id: number) {
    const res = await axios<ThanhToanHopDongModel>(
        `${BACKEND_URL}/thanh-toan-hop-dong/get-by-id/${id}`,
        {
            method: 'get',
        }
    );
    return res.data;
}