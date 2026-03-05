import axios from "axios";
import type { ThanhToanTaxModel } from "../../model/thanh-toan-tax.model";
import { BACKEND_URL } from "../../common/common";

export default async function UpdateThanhToanTaxService(updateDto: ThanhToanTaxModel) {
    const res = await axios<ThanhToanTaxModel>(
        `${BACKEND_URL}/thanh-toan-tax/update`,
        {
            method: 'patch',
            data: updateDto,
        }
    );
    return res.data;
}