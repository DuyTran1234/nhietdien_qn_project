import { vietNamFormatter } from "../../common/numberFormat";

export default function DisplayThanhToan({ tongSoTien, daThanhToan }: { tongSoTien: number, daThanhToan: number }) {
    return (
        <div>
            <p><b>Tổng tiền: </b>{vietNamFormatter(tongSoTien)}đ</p>
            <p><b>Đã thanh toán: </b>{vietNamFormatter(daThanhToan)}đ</p>
            <p><b>Cần thanh toán: </b></p>
            {checkThanhToan(daThanhToan, tongSoTien)}
        </div>
    );

}

function checkThanhToan(daThanhToan: number, tongTien: number) {
    const sub = daThanhToan - tongTien;
    if (sub > 0) {
        return (
            <p style={{ color: 'green' }}>{`(Thừa) ${vietNamFormatter(sub)}đ`}</p>
        );
    } else if (sub < 0) {
        return (
            <p style={{ color: 'red' }}>{`(Thiếu) ${vietNamFormatter(sub)}đ`}</p>
        );
    } else {
        return (
            <p style={{ color: 'green' }}>{`Đã thanh toán đủ`}</p>
        );
    }
}
