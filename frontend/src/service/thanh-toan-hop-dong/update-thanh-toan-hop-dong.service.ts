import axios from "axios";
import type { ThanhToanHopDongModel } from "../../model/thanh-toan-hop-dong.model";
import { BACKEND_URL } from "../../common/common";

export default async function updateThanhToanHopDongService(updateDto: ThanhToanHopDongModel) {
    const res = await axios<ThanhToanHopDongModel>(
        `${BACKEND_URL}/thanh-toan-hop-dong/update`,
        {
            method: 'patch',
            data: updateDto,
        }
    );
    return res.data;
}