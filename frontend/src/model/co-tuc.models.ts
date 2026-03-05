
export interface CoTucModel {
    id: number;
    hoTen: string;
    sid: string;
    soDKSH: string;
    ngayCap: string;
    diaChi: string;
    email: string;
    dienThoai: string;
    quocTich: string;
    stk: string;
    searchCol: string;
    chiTietCoTuc: ChiTietCoTucEntity[];
}

export interface ChiTietCoTucEntity {
    id: number;
    soDKSH: string;
    soDkshNamChot: string;
    slckngChuaLk: number;
    slckngDaLk: number;
    slckngChuaLkTruocTax: number;
    slckngDaLkTruocTax: number;
    slckngChuaLkSauTax: number;
    slckngDaLkSauTax: number;
    thanhToanChuaLk: boolean;
    thanhToanDaLk: boolean;
    namChot: number;
}