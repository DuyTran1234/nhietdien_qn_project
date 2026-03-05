import axios from "axios";
import type { ThanhToanHopDongModel } from "../../model/thanh-toan-hop-dong.model";
import { BACKEND_URL } from "../../common/common";

export default async function createThanhToanHopDongService(createDto: ThanhToanHopDongModel) {
    const res = await axios<ThanhToanHopDongModel>(
        `${BACKEND_URL}/thanh-toan-hop-dong/create`,
        {
            method: 'post',
            data: createDto,
        }
    );
    return res.data;
}