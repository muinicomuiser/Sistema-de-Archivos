import { ApiProperty } from "@nestjs/swagger";

export class GetRegistroDocumentoDto {
    @ApiProperty()
    nombreOriginal: string;
    @ApiProperty()
    nombreAsignado: string;
    @ApiProperty()
    rutaServidor: string;
    @ApiProperty()
    fechaHoraCarga: string;

    set fechaHora(fecha: Date) {
        const hora: string = `${fecha.getHours()}`.length > 1 ? `${fecha.getHours()}` : `0${fecha.getHours()}`
        const minutos: string = `${fecha.getMinutes()}`.length > 1 ? `${fecha.getMinutes()}` : `0${fecha.getMinutes()}`
        this.fechaHoraCarga = `${fecha.getFullYear()}-${fecha.getMonth()}-${fecha.getDate()} ${hora}:${minutos}`
    }
}