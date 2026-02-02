import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { HopDongThueDatModule } from "./hop-dong-thue-dat/hop-dong-thue-dat.module";
import { ThueSuatDatModule } from "./thue-suat-dat/thue-suat-dat.module";
import { ConfigModule } from "@nestjs/config";
import { addTransactionalDataSource } from "typeorm-transactional";
import { DataSource } from "typeorm";
import { ThanhToanHopDongModule } from "./thanh-toan-hop-dong/thanh-toan-hop-dong.module";

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        TypeOrmModule.forRootAsync({
            useFactory: () => ({
                type: 'postgres',
                host: process.env.DB_HOST,
                port: Number(process.env.DB_PORT) || 5432,
                username: process.env.DB_USERNAME,
                password: process.env.DB_PWD,
                database: process.env.DB_NAME,
                autoLoadEntities: true,
                synchronize: false,
            }),
            dataSourceFactory: async (options) => {
                if (!options) {
                    throw new Error('typeorm transactional config error');
                }
                return addTransactionalDataSource(new DataSource(options));
            },
        }),
        ThueSuatDatModule,
        HopDongThueDatModule,
        ThanhToanHopDongModule,
    ],
    providers: [

    ],
    controllers: [

    ],
})
export class AppModule { }