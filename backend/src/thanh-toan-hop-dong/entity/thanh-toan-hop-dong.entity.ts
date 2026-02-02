import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { KyThanhToan } from "../enum/ky-thanh-toan.enum";
import { LoaiThanhToan } from "../enum/loai-thanh-toan.enum";
import { HopDongThueDatEntity } from "src/hop-dong-thue-dat/entity/hop-dong-thue-dat.entity";

@Entity({ name: 'thanh_toan_hop_dong' })
export class ThanhToanHopDongEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'hop_dong_uuid', type: 'uuid' })
    hopDongUUID: string;

    @Column({ name: 'ngay_thanh_toan', type: 'date' })
    ngayThanhToan: string;

    @Column({ name: 'ky', type: 'int' })
    ky: KyThanhToan;

    @Column({
        name: 'tien_thanh_toan', type: 'bigint',
        transformer: {
            to: (value: Number) => value,
            from: (value: string) => Number(value),
        }
    })
    tienThanhToan: number;

    @Column({ name: 'loai_nop', type: 'int' })
    loaiNop: LoaiThanhToan;

    @Column({ name: 'note', type: 'text' })
    note: string;
}