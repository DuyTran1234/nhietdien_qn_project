import { HopDongThueDatEntity } from "src/hop-dong-thue-dat/entity/hop-dong-thue-dat.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'thue_suat_dat' })
export class ThueSuatDatEntity {
    @PrimaryGeneratedColumn({ name: 'id' })
    id: number;

    @Column({ name: 'ten_thue_suat' })
    tenThueSuat: string;

    @Column({
        name: 'tax',
        type: 'decimal',
        precision: 5, scale: 2,
        transformer: {
            to: (value: number) => value,
            from: (value: string) => Number(value)
        }
    })
    tax: number;

    @Column({ name: 'is_active' })
    isActive: boolean;

    @OneToMany(() => HopDongThueDatEntity, (hopdong) => hopdong.thueSuat)
    hopDongThueDatList: HopDongThueDatEntity[];
}