import { BadRequestException } from '@nestjs/common';
import { Injectable } from '@nestjs/common/decorators/core';
import { InjectRepository } from '@nestjs/typeorm';
import { promises as FileSystem } from 'fs';
import { Documento } from 'src/orm/entity/documento.entity';
import { Like, Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { GetRegistroDocumentoDto } from '../dto/get.registro.documento.dto';
import { DocumentoMapper } from '../mapper/documento.mapper';
@Injectable()
export class DocumentosService {
  constructor(
    @InjectRepository(Documento)
    private readonly documentoRepository: Repository<Documento>,
  ) { }

  async cargarDocumento(
    rut: string,
    files: Express.Multer.File[],
  ): Promise<GetRegistroDocumentoDto[]> {
    const fecha: Date = new Date();
    const ruta = this.rutaFecha(fecha);
    const registrosDocumentos: Documento[] = [];
    try {
      await FileSystem.mkdir(`./${process.env.DIR_ARCHIVOS}/${ruta}`, {
        recursive: true,
      });

      await Promise.all(
        files.map(async (file) => {
          const extension: string = file.originalname.slice(
            file.originalname.lastIndexOf('.') + 1,
          );
          const nuevoUUID: string = uuidv4();
          await FileSystem.writeFile(
            `./${process.env.DIR_ARCHIVOS}/${ruta}/${nuevoUUID}.${extension}`,
            file.buffer,
          );

          const nuevoDocumento: Documento = new Documento()
            .setRut(rut)
            .setNombreOriginal(file.originalname)
            .setNombreAsignado(`${nuevoUUID}.${extension}`)
            .setRutaServidor(
              `/${process.env.RUTA_ESTATICOS_SERVER}/${ruta}/${nuevoUUID}.${extension}`,
            )
            .setFechaHoraCarga(fecha);
          registrosDocumentos.push(nuevoDocumento);
        }),
      );
    } catch (error) {
      console.error(error);
      throw new BadRequestException('Error al guardar los documentos.');
    }
    try {
      const registrados: Documento[] =
        await this.documentoRepository.save(registrosDocumentos);
      return DocumentoMapper.entitiesToDtos(registrados);
    } catch (error) {
      console.error(error);
      throw new BadRequestException('Error al registrar un documento');
    }
  }

  async obtenerRegistrosDocumentos(
    rutUsuario: string,
  ): Promise<GetRegistroDocumentoDto[]> {
    try {
      const registros: Documento[] = await this.documentoRepository.find({
        where: {
          rut: rutUsuario,
        },
      });
      const registrosDto: GetRegistroDocumentoDto[] =
        DocumentoMapper.entitiesToDtos(registros);
      return registrosDto;
    } catch (error) {
      throw new BadRequestException('Error al obtener los registros.');
    }
  }

  async eliminarPorUuid(uuid: string): Promise<string> {
    const registroDocumento: Documento = await this.documentoRepository.findOne(
      {
        where: {
          nombreAsignado: Like(`%${uuid}%`),
        },
      },
    );
    const rutaArchivo: string = registroDocumento.rutaServidor.replace(
      `${process.env.RUTA_ESTATICOS_SERVER}`,
      `${process.env.DIR_ARCHIVOS}`,
    );
    try {
      await FileSystem.unlink(`.${rutaArchivo}`);
      await this.eliminarDirectoriosVacios(`.${rutaArchivo}`);
    } catch (error) {
      console.error(error);
      throw new BadRequestException('Error al eliminar el documento.');
    }
    try {
      await this.documentoRepository.remove(registroDocumento);
      return 'Documento eliminado';
    } catch (error) {
      console.error(error);
      throw new BadRequestException('Error al eliminar el registro.');
    }
  }

  /**Elimina todos los directorios que queden vacíos después de boorar un documento.*/
  private async eliminarDirectoriosVacios(rutaArchivo: string): Promise<void> {
    let dirArchivoEliminado: string = rutaArchivo.slice(
      0,
      rutaArchivo.lastIndexOf('/'),
    );
    const subRutas: string[] = dirArchivoEliminado.split('/');
    for (let i = 1; i < subRutas.length; i++) {
      const contenido: string[] = await FileSystem.readdir(
        `${dirArchivoEliminado}`,
        { recursive: true },
      );
      if (contenido.length == 0) {
        try {
          await FileSystem.rm(`${dirArchivoEliminado}`, { recursive: true });
        } catch (error) {
          console.error(error);
          throw new BadRequestException('Error al eliminar un directorio.');
        }
        dirArchivoEliminado = dirArchivoEliminado.slice(
          0,
          dirArchivoEliminado.lastIndexOf('/'),
        );
      } else {
        break;
      }
    }
  }

  /**Retorna un string tipo ruta con formato "AAAA/MM/DD/HH/MM" a partir de un valor tipo Date.*/
  private rutaFecha(fecha: Date): string {
    const hora: string =
      `${fecha.getHours()}`.length > 1
        ? `${fecha.getHours()}`
        : `0${fecha.getHours()}`;
    const minutos: string =
      `${fecha.getMinutes()}`.length > 1
        ? `${fecha.getMinutes()}`
        : `0${fecha.getMinutes()}`;
    return `${fecha.getFullYear()}/${fecha.getMonth()}/${fecha.getDate()}/${hora}/${minutos}`;
  }
}
