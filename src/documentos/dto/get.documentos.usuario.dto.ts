import { GetRegistroDocumentoDto } from "./get.registro.documento.dto";

export class GetDocumentosUsuarioDto {
    rutUsuario: string;
    registrosDocumentos: GetRegistroDocumentoDto[]
    constructor(
        rut: string,
        registros: GetRegistroDocumentoDto[]
    ) {
        this.rutUsuario = rut;
        this.registrosDocumentos = registros
    }
}