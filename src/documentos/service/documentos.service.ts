import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Documento } from 'src/orm/entity/documento.entity';
import { Repository } from 'typeorm';
import { promises as FileSystem } from 'fs';
import { v4 as uuidv4 } from 'uuid';
import { GetDocumentosUsuarioDto } from '../dto/get.documentos.usuario.dto';
import { GetRegistroDocumentoDto } from '../dto/get.registro.documento.dto';
import { DocumentoMapper } from '../mapper/documento.mapper';
@Injectable()
export class DocumentosService {

    constructor(@InjectRepository(Documento) private readonly documentoRepository: Repository<Documento>) { }

    async cargarDocumento(rut: string, files: Express.Multer.File[]): Promise<GetRegistroDocumentoDto[]> {
        const fecha: Date = new Date();
        const ruta = this.rutaFecha(fecha);
        const registrosDocumentos: Documento[] = []
        await FileSystem.mkdir(`./${process.env.DIR_ARCHIVOS}/${ruta}`, { recursive: true })
        for (let file of files) {
            const extension: string = file.mimetype.split('/')[1];
            const nuevoUUID: string = uuidv4()
            await FileSystem.writeFile(
                `./${process.env.DIR_ARCHIVOS}/${ruta}/${nuevoUUID}.${extension}`,
                file.buffer
            )
            const nuevoDocumento: Documento = new Documento()
                .setRut(rut)
                .setNombreOriginal(file.originalname)
                .setNombreAsignado(`${nuevoUUID}.${extension}`)
                .setRutaServidor(`/${process.env.RUTA_ESTATICOS_SERVER}/${ruta}/${nuevoUUID}.${extension}`)
                .setFechaHoraCarga(fecha)
            registrosDocumentos.push(nuevoDocumento)
        }
        const registrados: Documento[] = await this.documentoRepository.save(registrosDocumentos)
        return DocumentoMapper.entitiesToDtos(registrados)
    }

    async obtenerRegistrosDocumentos(rutUsuario: string): Promise<GetDocumentosUsuarioDto> {
        const registros: Documento[] = await this.documentoRepository.find({
            where: {
                rut: rutUsuario
            }
        })
        const registrosDto: GetRegistroDocumentoDto[] = DocumentoMapper.entitiesToDtos(registros)
        return new GetDocumentosUsuarioDto(rutUsuario, registrosDto)
    }

    private rutaFecha(fecha: Date): string {
        const hora: string = `${fecha.getHours()}`.length > 1 ? `${fecha.getHours()}` : `0${fecha.getHours()}`
        const minutos: string = `${fecha.getMinutes()}`.length > 1 ? `${fecha.getMinutes()}` : `0${fecha.getMinutes()}`
        return `${fecha.getFullYear()}/${fecha.getMonth()}/${fecha.getDate()}/${hora}/${minutos}`
    }
}
