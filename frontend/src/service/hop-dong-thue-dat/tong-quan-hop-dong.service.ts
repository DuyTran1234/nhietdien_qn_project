import axios from "axios";
import { BACKEND_URL } from "../../common/common";
import type { HopDongThueDatModel } from "../../model/hop-dong-thue-dat.model";

export default async function tongQuanHopDongService()
    : Promise<{ total: string, ky1: string, ky2: string, boSung: string }> {
    const res = await axios<{
        list: HopDongThueDatModel[], total: number
    }>(`${BACKEND_URL}/hop-dong-thue-dat/get-pagination`, {
        method: 'post',
        params: {
            limit: 0,
            page: 0
        },
    });
    let thanhToanKy1 = 0;
    let thanhToanKy2 = 0;
    let totalBoSung = 0;
    let thanhToanBoSung = 0;
    for (const hopDong of res.data.list) {
        thanhToanKy1 +=
            hopDong.chiTietCacKy[0].daThanhToan >= hopDong.chiTietCacKy[0].tongSoTien ? 1 : 0;
        thanhToanKy2 +=
            hopDong.chiTietCacKy[1].daThanhToan >= hopDong.chiTietCacKy[1].tongSoTien ? 1 : 0;
        if (hopDong.chiTietCacKy.length > 2) {
            ++totalBoSung;
            thanhToanBoSung +=
                hopDong.chiTietCacKy[2].daThanhToan >= hopDong.chiTietCacKy[2].tongSoTien ? 1 : 0;
        }
    }

    return {
        total: `${res.data.total ?? 0}`,
        ky1: `${thanhToanKy1}/${res.data.total}`,
        ky2: `${thanhToanKy2}/${res.data.total}`,
        boSung: `${thanhToanBoSung}/${totalBoSung}`,
    };

}