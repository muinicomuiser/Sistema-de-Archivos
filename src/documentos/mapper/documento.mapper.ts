import { Documento } from 'src/orm/entity/documento.entity';
import { GetRegistroDocumentoDto } from '../dto/get.registro.documento.dto';

export class DocumentoMapper {


  static entityToDto(documento: Documento): GetRegistroDocumentoDto {
    const nuevoDto: GetRegistroDocumentoDto = new GetRegistroDocumentoDto();
    nuevoDto.nombreAsignado = documento.nombreAsignado;
    nuevoDto.fechaHora = documento.fechaHoraCarga;
    nuevoDto.nombreOriginal = documento.nombreOriginal;
    nuevoDto.rutaServidor = documento.rutaServidor;
    return nuevoDto;
  }

  static entitiesToDtos(documentos: Documento[]): GetRegistroDocumentoDto[] {
    return documentos.map((documento) => this.entityToDto(documento));
  }
}
