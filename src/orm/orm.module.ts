import { Module } from '@nestjs/common/decorators';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Documento } from './entity/documento.entity';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath:
                process.env.AMBIENTE != undefined
                    ? `.env.${process.env.AMBIENTE}`
                    : undefined,
        }), TypeOrmModule.forRoot({
            type: 'mysql',
            host: process.env.HOST_DB,
            port: +process.env.PUERTO_DB,
            username: process.env.USUARIO_DB,
            password: process.env.CONTRASENA_DB,
            database: process.env.NOMBRE_DB,
            entities: [
                Documento
            ]
        })]
})
export class OrmModule { }
