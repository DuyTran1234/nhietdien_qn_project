import axios from "axios";
import type { ThanhToanTaxModel } from "../../model/thanh-toan-tax.model";
import { BACKEND_URL } from "../../common/common";

export default async function createThanhToanTaxService(createDto: ThanhToanTaxModel) {
    const res = await axios<ThanhToanTaxModel>(
        `${BACKEND_URL}/thanh-toan-tax/create`,
        {
            method: 'post',
            data: createDto,
        }
    );
    return res.data;
}