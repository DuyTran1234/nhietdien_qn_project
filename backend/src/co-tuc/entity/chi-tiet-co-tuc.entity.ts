import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { CoTucEntity } from "./co-tuc.entity";

@Entity('chi_tiet_co_tuc')
export class ChiTietCoTucEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'so_dksh', type: "varchar" })
    soDKSH: string;

    @Column({ name: 'so_dksh_nam_chot', type: "varchar", unique: true })
    soDkshNamChot: string;

    @Column({ name: 'slckng_chualk', type: "int" })
    slckngChuaLk: number;

    @Column({ name: 'slckng_dalk', type: "int", })
    slckngDaLk: number;

    @Column({
        name: 'slckng_chualk_truoc_tax', type: "bigint",
        transformer: {
            to: (value: number) => value,
            from: (value: string) => Number(value),
        }
    })
    slckngChuaLkTruocTax: number;

    @Column({
        name: 'slckng_dalk_truoc_tax', type: "bigint",
        transformer: {
            to: (value: number) => value,
            from: (value: string) => Number(value),
        }
    })
    slckngDaLkTruocTax: number;

    @Column({
        name: 'slckng_chualk_sau_tax', type: "bigint",
        transformer: {
            to: (value: number) => value,
            from: (value: string) => Number(value),
        }
    })
    slckngChuaLkSauTax: number;

    @Column({
        name: 'slckng_dalk_sau_tax', type: "bigint",
        transformer: {
            to: (value: number) => value,
            from: (value: string) => Number(value),
        }
    })
    slckngDaLkSauTax: number;

    @Column({ name: 'thanhtoan_chualk', type: "boolean" })
    thanhToanChuaLk: boolean;

    @Column({ name: 'thanhtoan_dalk', type: "boolean" })
    thanhToanDaLk: boolean;

    @Column({ name: 'nam_chot', type: 'int' })
    namChot: number;

    @ManyToOne(() => CoTucEntity, (coTuc: CoTucEntity) => coTuc.chiTietCoTuc)
    @JoinColumn({
        name: 'so_dksh',
        referencedColumnName: 'soDKSH'
    })
    coTuc: CoTucEntity;
}