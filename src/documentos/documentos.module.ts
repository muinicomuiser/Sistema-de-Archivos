import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Documento } from 'src/orm/entity/documento.entity';
import { DocumentosController } from './controller/documentos.controller';
import { DocumentosService } from './service/documentos.service';

@Module({
  imports: [TypeOrmModule.forFeature([Documento])],
  controllers: [DocumentosController],
  providers: [DocumentosService],
})
export class DocumentosModule { }
