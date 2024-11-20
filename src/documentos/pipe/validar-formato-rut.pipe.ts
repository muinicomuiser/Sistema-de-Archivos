import { formatRut, isRutLike } from '@fdograph/rut-utilities';
import {
  PipeTransform,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { Injectable } from '@nestjs/common/decorators/core';

@Injectable()
export class ValidarFormatoRutPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (!isRutLike(value)) {
      throw new BadRequestException('El rut no es válido');
    }
    return formatRut(value, 2);
  }
}
