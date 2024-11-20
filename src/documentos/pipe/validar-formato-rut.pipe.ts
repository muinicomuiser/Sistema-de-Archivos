import { formatRut, isRutLike } from '@fdograph/rut-utilities';
import {
  ArgumentMetadata,
  BadRequestException,
  PipeTransform,
} from '@nestjs/common';
import { Injectable } from '@nestjs/common/decorators/core';

/**Validar si el rut ingresado tiene un formato válido. Valida aunque no tenga puntos ni guiones y les da formato con puntos y guión.*/
@Injectable()
export class ValidarFormatoRutPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (!isRutLike(value)) {
      throw new BadRequestException('El rut no es válido. Debe tener un formato nn.nnn.nnn-d o n.nnn.nnn-d. Los puntos y guiones son opcionales.');
    }
    return formatRut(value, 2);
  }
}
