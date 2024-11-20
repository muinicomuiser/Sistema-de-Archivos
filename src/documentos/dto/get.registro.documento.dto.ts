import { ApiProperty } from '@nestjs/swagger';

export class GetRegistroDocumentoDto {
  @ApiProperty({ example: 'archivo.jpg' })
  nombreOriginal: string;
  @ApiProperty({ example: 'formato_uuid.jpg' })
  nombreAsignado: string;
  @ApiProperty({ example: '/estaticos/ruta/formato_uuid.jpg' })
  rutaServidor: string;
  @ApiProperty({ example: 'AAAA-MM-DD HH:MM' })
  fechaHoraCarga: string;

  /**Set que formatea un valor tipo Date a un string con forma "AAAA-MM-DD HH:MM" */
  set fechaHora(fecha: Date) {
    const hora: string =
      `${fecha.getHours()}`.length > 1
        ? `${fecha.getHours()}`
        : `0${fecha.getHours()}`;
    const minutos: string =
      `${fecha.getMinutes()}`.length > 1
        ? `${fecha.getMinutes()}`
        : `0${fecha.getMinutes()}`;
    this.fechaHoraCarga = `${fecha.getFullYear()}-${fecha.getMonth()}-${fecha.getDate()} ${hora}:${minutos}`;
  }
}
