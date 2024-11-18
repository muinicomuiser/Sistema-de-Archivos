import { Module } from '@nestjs/common';
import { DocumentosService } from './documentos.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Documento } from 'src/orm/entity/documento.entity';

@Module({
  imports: [TypeOrmModule.forFeature([
    Documento
  ])],
  providers: [DocumentosService]
})
export class DocumentosModule { }
