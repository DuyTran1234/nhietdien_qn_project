import { ThanhToanHopDongEntity } from "src/thanh-toan-hop-dong/entity/thanh-toan-hop-dong.entity";
import { ThueSuatDatEntity } from "src/thue-suat-dat/entity/thue-suat-dat.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'hop_dong' })
export class HopDongThueDatEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'hop_dong_uuid', type: 'uuid' })
    hopDongUUID: string;

    @Column({ name: 'so_hop_dong' })
    soHopDong: string

    @Column({ name: 'hop_dong_date', type: 'date' })
    hopDongDate: string;

    @Column({ name: 'file_hop_dong', nullable: true })
    fileHopDong: string;

    @Column({
        name: 'dien_tich',
        type: 'decimal',
        precision: 12, scale: 2,
        transformer: {
            to: (value: number) => value,
            from: (value: string) => Number(value)
        }
    })
    dienTich: number;

    @Column({ name: 'bat_dau_thue', type: 'date' })
    batDauThue: string;

    @Column({ name: 'so_nam_thue' })
    soNamThue: number;

    @Column({
        name: 'end_date',
        type: 'date',
        insert: false,
        update: false,
    })
    endDate: string;

    @Column({ name: 'muc_dich_thue' })
    mucDichThue: string;

    @Column({ name: 'khu_vuc_thue' })
    khuVucThue: string;

    @Column({ name: 'vi_tri_thue' })
    viTriThue: string;

    @Column({ name: 'thue_suat_id' })
    thueSuatId: number;

    @ManyToOne(() => ThueSuatDatEntity, (thueSuat) => thueSuat.hopDongThueDatList)
    @JoinColumn({ name: 'thue_suat_id' })
    thueSuat: ThueSuatDatEntity;

    @Column({
        name: 'gia_pnn',
        type: 'bigint',
        transformer: {
            to: (value: Number) => value,
            from: (value: string) => Number(value),
        }
    })
    giaPnn: number;

    @Column({ name: 'is_active' })
    isActive: boolean;

    @Column({ name: 'is_newest' })
    isNewest: boolean;

    @Column({ name: 'ghi_chu' })
    ghiChu: string;

    @Column({ name: 'quyet_dinh_thue_dat_so' })
    quyetDinhThueDatSo: string;

    @Column({ name: 'quyet_dinh_thue_dat_date', type: 'date' })
    quyetDinhThueDatDate: string;

    @Column({ name: 'file_quyet_dinh_cho_thue_dat' })
    fileQuyetDinhChoThueDat: string;

    @Column({ name: 'quyet_dinh_don_gia_so' })
    quyetDinhDonGiaSo: string;

    @Column({ name: 'quyet_dinh_don_gia_date', type: 'date' })
    quyetDinhDonGiaDate: string;

    @Column({ name: 'don_gia_thue' })
    donGiaThue: number;

    @Column({ name: 'on_dinh_don_gia_date', type: 'date' })
    onDinhDonGiaDate: string;

    @Column({ name: 'so_nam_on_dinh' })
    soNamOnDinh: number;

    @Column({ name: 'ap_dung_don_gia_date' })
    apDungDonGiaDate: string;
}