import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

/**Valida que el arreglo de documentos cargados no llegue vacío. */
@Injectable()
export class ValidarFilesNoVaciosPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (value.length < 1) {
      throw new BadRequestException('Se debe adjuntar al menos un documento.')
    }
    return value;
  }
}
