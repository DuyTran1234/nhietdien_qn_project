import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'thanh_toan_tax' })
export class ThanhToanTaxEntity {
    @PrimaryGeneratedColumn({ name: 'id' })
    id: number;

    @Column({ name: 'hop_dong_uuid' })
    hopDongUUID: string;

    @Column({ name: 'ngay_thanh_toan', type: 'date' })
    ngayThanhToan: string;

    @Column({
        name: 'tien_thanh_toan', type: 'bigint',
        transformer: {
            to: (value: Number) => value,
            from: (value: string) => Number(value),
        }
    })
    tienThanhToan: number;

    @Column({ name: 'note', type: 'text' })
    note: string;
}