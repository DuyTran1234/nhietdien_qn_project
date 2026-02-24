import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('co_dong')
export class CoDongEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'ho_ten', type: 'varchar' })
    hoTen: string;

    @Column({ name: 'so_dksh', type: 'varchar', unique: true })
    soDKSH: string;

    @Column({ name: 'ngay_cap', type: "varchar" })
    ngayCap: string;

    @Column({ name: 'dia_chi', type: "varchar" })
    diaChi: string;

    @Column({ name: 'email', type: "varchar", nullable: true })
    email: string;

    @Column({ name: 'dien_thoai', type: "varchar", nullable: true })
    dienThoai: string;

    @Column({ name: 'quoc_tich', type: "varchar" })
    quocTich: string;

    @Column({
        name: 'slckng_cong',
        type: 'bigint',
        transformer: {
            to: (value: Number) => value,
            from: (value: string) => Number(value),
        },
    })
    slckngCong: number;

    @Column({ name: 'ghi_chu', type: "text", nullable: true })
    ghiChu: string;

    @Column({ name: 'type', type: "int" })
    type: number;

    @Column({ name: 'cntc', type: "int" })
    cntc: number;

    @Column({ name: 'txnum', type: "varchar" })
    txnum: string;

    @Column({
        name: 'search_col',
        select: false,
        insert: false,
        update: false,
    })
    searchCol: string;
}