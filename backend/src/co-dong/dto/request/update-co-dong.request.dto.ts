import dayjs from "dayjs";

export class UpdateCoDongRequestDto {
    id: number;

    hoTen: string;

    soDKSH: string;

    ngayCap: string[];

    diaChi: string;

    email: string;

    dienThoai: string;

    quocTich: string;

    slckngCong: number;

    ghiChu: string;

    type: number;

    cntc: number;

    txnum: string;
}