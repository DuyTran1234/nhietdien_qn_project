import axios from "axios";
import type { ThanhToanTaxModel } from "../../model/thanh-toan-tax.model";
import { BACKEND_URL } from "../../common/common";

export default async function getThanhToanTaxByIdService(id: number) {
    const res = await axios.get<ThanhToanTaxModel>(
        `${BACKEND_URL}/thanh-toan-tax/get-by-id/${id}`
    );
    return res.data;
}