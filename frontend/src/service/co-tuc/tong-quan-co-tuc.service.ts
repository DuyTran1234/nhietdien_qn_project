import axios from "axios";
import type { CoTucModel } from "../../model/co-tuc.models";
import { BACKEND_URL } from "../../common/common";
import dayjs from "dayjs";

export default async function tongQuanCoTucService()
    : Promise<{ total: string, thanhToanChuaLk: string, thanhToanDaLk: string }> {
    const res = await axios<{ list: CoTucModel[], total: number }>(
        `${BACKEND_URL}/co-tuc/get-pagination-co-tuc`,
        {
            method: 'post',
            params: {
                namChot: dayjs().year(),
            }
        }
    );
    const total = res.data.total;
    let thanhToanChuaLk = 0;
    let thanhToanDaLk = 0;
    for (const coTuc of res.data.list) {
        thanhToanChuaLk += coTuc.chiTietCoTuc[0].thanhToanChuaLk ? 1 : 0;
        thanhToanDaLk += coTuc.chiTietCoTuc[0].thanhToanDaLk ? 1 : 0;
    }
    return {
        total: `${total}`,
        thanhToanChuaLk: `${thanhToanChuaLk}/${total}`,
        thanhToanDaLk: `${thanhToanDaLk}/${total}`,
    }
}