import axios from "axios";
import type { ThueSuatDatModel } from "../../model/thue-suat-dat.model";
import { BACKEND_URL } from "../../common/common";

export default async function CreateThueSuatDatService(data: ThueSuatDatModel): Promise<ThueSuatDatModel> {
    const res = await axios.post<ThueSuatDatModel>(`${BACKEND_URL}/thue-suat-dat/create`, data);
    return res.data;
}