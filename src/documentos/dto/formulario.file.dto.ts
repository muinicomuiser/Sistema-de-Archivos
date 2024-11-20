import { ApiProperty } from '@nestjs/swagger';

/**Clase de referencia para configurar la carga de archivos en Swagger */
export class FormularioFileDto {
  @ApiProperty({
    type: 'array',
    items: {
      type: 'file',
      items: {
        type: 'string',
        format: 'binary',
      },
    },
  })
  archivos: Express.Multer.File[];
}
