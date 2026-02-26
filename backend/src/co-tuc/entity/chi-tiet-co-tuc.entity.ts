import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { CoTucEntity } from "./co-tuc.entity";

@Entity('chi-tiet-co-tuc')
export class ChiTietCoTucEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'so_dksh', type: "varchar", length: 255 })
    soDKSH: string;

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

    @Column({ name: 'nam_chot', type: 'int' })
    namChot: number;

    @ManyToOne(() => CoTucEntity, (coTuc: CoTucEntity) => coTuc.chiTietCoTuc)
    @JoinColumn({ name: 'so_dksh' })
    coTuc: CoTucEntity;
}