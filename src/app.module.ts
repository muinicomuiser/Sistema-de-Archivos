import { OrmModule } from './orm/orm.module';
import { DocumentosController } from './documentos/controller/documentos.controller';
import { DocumentosModule } from './documentos/documentos.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [OrmModule, DocumentosModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
