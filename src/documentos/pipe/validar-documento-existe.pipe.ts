import {
  PipeTransform,
  ArgumentMetadata,
  NotFoundException,
} from '@nestjs/common';
import { Injectable } from '@nestjs/common/decorators/core';
import { InjectRepository } from '@nestjs/typeorm';
import { Documento } from 'src/orm/entity/documento.entity';
import { Repository, Like } from 'typeorm';

@Injectable()
export class ValidarDocumentoExistePipe implements PipeTransform {
  constructor(
    @InjectRepository(Documento)
    private readonly documentoRepository: Repository<Documento>,
  ) {}

  async transform(value: any, metadata: ArgumentMetadata) {
    const existe: boolean = await this.documentoRepository.existsBy({
      nombreAsignado: Like(`%${value}%`),
    });
    if (!existe) {
      throw new NotFoundException('No existe un documento con ese nombre.');
    }
    return value;
  }
}
