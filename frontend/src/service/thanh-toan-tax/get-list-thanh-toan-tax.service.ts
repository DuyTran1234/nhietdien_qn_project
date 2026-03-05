import axios from "axios";
import type { ThanhToanTaxModel } from "../../model/thanh-toan-tax.model";
import { BACKEND_URL } from "../../common/common";

export default async function getListThanhToanTax(uuid: string, year: number) {
    const res = await axios.get<ThanhToanTaxModel[]>(
        `${BACKEND_URL}/thanh-toan-tax/get-by-hop-dong-uuid`,
        {
            params: {
                hopDongUUID: uuid,
                year: year,
            }
        }
    );
    return res.data;
}