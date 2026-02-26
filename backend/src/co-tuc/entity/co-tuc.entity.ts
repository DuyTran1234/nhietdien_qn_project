import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ChiTietCoTucEntity } from "./chi-tiet-co-tuc.entity";

@Entity('co-tuc')
export class CoTucEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'ho_ten', type: "varchar", length: 255 })
    hoTen: string;

    @Column({ name: 'sid', type: "varchar", length: 255, unique: true })
    sid: string;

    @Column({ name: 'so_dksh', type: "varchar", length: 255, unique: true })
    soDKSH: string;

    @Column({ name: 'ngay_cap', type: "varchar", length: 255 })
    ngayCap: string;

    @Column({ name: "dia_chi", type: "varchar", length: 512 })
    diaChi: string;

    @Column({ name: "email", type: "varchar", length: 255, nullable: true })
    email: string;

    @Column({ name: "dien_thoai", type: "varchar", length: 255, nullable: true })
    dienThoai: string;

    @Column({ name: "quoc_tich", type: "varchar", length: 255 })
    quocTich: string;

    @Column({ name: "quoc_tich", type: "varchar", length: 255, nullable: true })
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