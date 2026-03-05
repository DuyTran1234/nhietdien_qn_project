import axios from "axios";
import type { ThueSuatDatModel } from "../../model/thue-suat-dat.model";
import { BACKEND_URL } from "../../common/common";

export default async function getThueSuatDatService(id: number): Promise<ThueSuatDatModel> {
    const res = await axios.get<ThueSuatDatModel>(`${BACKEND_URL}/thue-suat-dat/get/${id}`);
    return res.data;
}