import { Controller, Delete, Get, Param, Post, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiExtraModels, ApiOperation, ApiResponse, ApiTags, getSchemaPath } from '@nestjs/swagger';
import { FormularioFileDto } from '../dto/formulario.file.dto';
import { DocumentosService } from '../service/documentos.service';
import { GetRegistroDocumentoDto } from '../dto/get.registro.documento.dto';

@ApiTags('Documentos')
@Controller('documentos')
export class DocumentosController {
    constructor(private readonly documentosService: DocumentosService) { }


    /**Validar:
     * Rut
     */
    @ApiConsumes('multipart/form-data')
    @ApiExtraModels(FormularioFileDto)  /**Para configurar el formulario de carga de archivos en swagger */
    @ApiOperation({ summary: 'Cargar documentos a un usuario.' })
    @ApiResponse({ status: 201, type: GetRegistroDocumentoDto, description: 'Carga documentos y devuelve sus registros.' })
    @ApiResponse({ status: 400, type: GetRegistroDocumentoDto, description: 'Error al cargar los documentos.' })
    @ApiBody({
        schema: {
            '$ref': getSchemaPath(FormularioFileDto)
        }
    })
    @Post(':rut_usuario')
    @UseInterceptors(
        FilesInterceptor('archivos')
    )
    async cargarDocumentos(
        @Param('rut_usuario') rutUsuario: string,
        @UploadedFiles() files: Express.Multer.File[]
    ): Promise<GetRegistroDocumentoDto[]> {
        const documentoCargado = await this.documentosService.cargarDocumento(rutUsuario, files)
        return documentoCargado
    }

    /**Validar:
    * Rut
    */
    @ApiOperation({ summary: 'Obtener información de los archivos de un usuario.' })
    @ApiResponse({ status: 200, type: GetRegistroDocumentoDto, description: 'Devuelve información del registro de los documentos de un usuario.' })
    @Get(':rut_usuario')
    async infoArchivosUsuario(
        @Param('rut_usuario') rutUsuario: string
    ): Promise<GetRegistroDocumentoDto[]> {
        const infoDocumentos: GetRegistroDocumentoDto[] = await this.documentosService.obtenerRegistrosDocumentos(rutUsuario);
        return infoDocumentos
    }

    /**Validar:
     * Rut
     */
    @ApiOperation({ summary: 'Eliminar un documento y su registro.' })
    @ApiResponse({ status: 200, type: GetRegistroDocumentoDto, description: 'Elimina un documento y su registro.' })
    @ApiResponse({ status: 404, type: GetRegistroDocumentoDto, description: 'No existe un documento con ese nombre.' })
    @Delete(':uuid_archivo')
    async eliminarArchivo(@Param('uuid_archivo') uuidArchivo: string): Promise<string> {
        return await this.documentosService.eliminarPorUuid(uuidArchivo);
    }
}
