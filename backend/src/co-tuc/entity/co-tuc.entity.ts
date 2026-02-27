import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ChiTietCoTucEntity } from "./chi-tiet-co-tuc.entity";

@Entity('co_tuc')
export class CoTucEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'ho_ten', type: "varchar" })
    hoTen: string;

    @Column({ name: 'sid', type: "varchar", unique: true })
    sid: string;

    @Column({ name: 'so_dksh', type: "varchar", unique: true })
    soDKSH: string;

    @Column({ name: 'ngay_cap', type: "varchar", })
    ngayCap: string;

    @Column({ name: "dia_chi", type: "varchar", })
    diaChi: string;

    @Column({ name: "email", type: "varchar", nullable: true })
    email: string;

    @Column({ name: "dien_thoai", type: "varchar", nullable: true })
    dienThoai: string;

    @Column({ name: "quoc_tich", type: "varchar", })
    quocTich: string;

    @Column({ name: "stk", type: "varchar", nullable: true })
    stk: string;

    @Column({
        name: 'search_col',
        insert: false,
        update: false,
        select: false,
    })
    searchCol: string;

    @OneToMany(() => ChiTietCoTucEntity, (chiTietCoTuc: ChiTietCoTucEntity) => chiTietCoTuc.coTuc)
    chiTietCoTuc: ChiTietCoTucEntity[];
}