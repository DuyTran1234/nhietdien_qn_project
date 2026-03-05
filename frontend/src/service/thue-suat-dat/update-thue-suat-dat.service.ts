import axios from "axios";
import type { ThueSuatDatModel } from "../../model/thue-suat-dat.model";
import { BACKEND_URL } from "../../common/common";

export default async function updateThueSuatDatService(updateDto: ThueSuatDatModel) {
    const res = await axios.patch(`${BACKEND_URL}/thue-suat-dat/update`, updateDto);
    return res;
}