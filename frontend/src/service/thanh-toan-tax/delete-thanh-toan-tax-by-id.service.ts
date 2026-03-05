import axios from "axios";
import { BACKEND_URL } from "../../common/common";

export default async function deleteThanhToanTaxService(id: number) {
    const res = await axios(
        `${BACKEND_URL}/thanh-toan-tax/delete/${id}`, {
        method: 'delete'
    });
    return res.data;
}