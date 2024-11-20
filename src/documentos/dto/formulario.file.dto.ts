import { ApiProperty } from '@nestjs/swagger';

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
