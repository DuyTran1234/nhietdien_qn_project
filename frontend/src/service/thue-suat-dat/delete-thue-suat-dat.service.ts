import axios from "axios";
import { BACKEND_URL } from "../../common/common";

export default async function deleteThueSuatDatService(id: number) {
    return await axios.delete(`${BACKEND_URL}/thue-suat-dat/delete/${id}`);
}