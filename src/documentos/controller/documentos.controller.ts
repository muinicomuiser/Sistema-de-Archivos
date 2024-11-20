import { ParseUUIDPipe } from '@nestjs/common';
import { Controller, UseInterceptors } from '@nestjs/common/decorators/core';
import {
  Delete,
  Get,
  Param,
  Post,
  UploadedFiles,
} from '@nestjs/common/decorators/http';
import { FilesInterceptor } from '@nestjs/platform-express';
import {
  ApiBody,
  ApiConsumes,
  ApiExtraModels,
  ApiOperation,
  ApiResponse,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';
import { FormularioFileDto } from '../dto/formulario.file.dto';
import { GetRegistroDocumentoDto } from '../dto/get.registro.documento.dto';
import { ValidarDocumentoExistePipe } from '../pipe/validar-documento-existe.pipe';
import { ValidarFormatoRutPipe } from '../pipe/validar-formato-rut.pipe';
import { DocumentosService } from '../service/documentos.service';
import { ValidarFilesNoVaciosPipe } from '../pipe/validar-files-no-vacios.pipe';

@ApiTags('Documentos')
@Controller('documentos')
export class DocumentosController {
  constructor(private readonly documentosService: DocumentosService) { }


  // 1.- CARGAR DOCUMENTOS
  @ApiConsumes('multipart/form-data')
  @ApiExtraModels(
    FormularioFileDto,
  )
  @ApiOperation({ summary: 'Cargar documentos a un usuario.' })
  @ApiResponse({
    status: 201,
    type: GetRegistroDocumentoDto,
    description: 'Carga documentos y devuelve sus registros.',
  })
  @ApiResponse({
    status: 400,
    description: 'Error al cargar los documentos.',
  })
  @ApiBody({
    schema: {
      $ref: getSchemaPath(FormularioFileDto),
    },
  })
  @Post(':rut_usuario')
  @UseInterceptors(FilesInterceptor('archivos'))
  async cargarDocumentos(
    @Param('rut_usuario', ValidarFormatoRutPipe) rutUsuario: string,
    @UploadedFiles(ValidarFilesNoVaciosPipe) files: Express.Multer.File[],
  ): Promise<GetRegistroDocumentoDto[]> {
    const documentoCargado = await this.documentosService.cargarDocumento(
      rutUsuario,
      files,
    );
    return documentoCargado;
  }


  // 2.- CONSULTAR DOCUMENTOS
  @ApiOperation({
    summary: 'Obtener información de los archivos de un usuario.',
  })
  @ApiResponse({
    status: 200,
    type: GetRegistroDocumentoDto,
    description:
      'Devuelve información del registro de los documentos de un usuario.',
  })
  @Get(':rut_usuario')
  async infoArchivosUsuario(
    @Param('rut_usuario', ValidarFormatoRutPipe) rutUsuario: string,
  ): Promise<GetRegistroDocumentoDto[]> {
    const infoDocumentos: GetRegistroDocumentoDto[] =
      await this.documentosService.obtenerRegistrosDocumentos(rutUsuario);
    return infoDocumentos;
  }


  // 3.- ELIMINAR DOCUMENTOS
  @ApiOperation({ summary: 'Eliminar un documento y su registro.' })
  @ApiResponse({
    status: 200,
    type: GetRegistroDocumentoDto,
    description: 'Elimina un documento y su registro.',
  })
  @ApiResponse({
    status: 404,
    description: 'No existe un documento con ese nombre.',
  })
  @Delete(':uuid_archivo')
  async eliminarArchivo(
    @Param(
      'uuid_archivo',
      new ParseUUIDPipe({ version: '4' }),
      ValidarDocumentoExistePipe,
    )
    uuidArchivo: string,
  ): Promise<string> {
    return await this.documentosService.eliminarPorUuid(uuidArchivo);
  }
}
