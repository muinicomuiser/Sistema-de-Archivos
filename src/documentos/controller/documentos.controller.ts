import { Controller, Delete, Get, Param, Post, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiExtraModels, ApiTags, getSchemaPath } from '@nestjs/swagger';
import { FormularioFileDto } from '../dto/formulario.file.dto';
import { DocumentosService } from '../service/documentos.service';

@ApiTags('Documentos')
@Controller('documentos')
export class DocumentosController {
    constructor(private readonly documentosService: DocumentosService) { }

    @ApiConsumes('multipart/form-data')
    @ApiExtraModels(FormularioFileDto)  /**Para configurar el formulario de carga de archivos en swagger */
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
    ) {
        const documentoCargado = await this.documentosService.cargarDocumento(rutUsuario, files)
        // console.log(files)
        return documentoCargado
    }



    @Get(':rut_usuario')
    infoArchivosUsuario(@Param('rut_usuario') rutUsuario: string) {
        return 'Hola'
    }



    @Delete(':uuid_archivo')
    eliminarArchivo(@Param('uuid_archivo') uuidArchivo: string) {
        return 'Holiwis'
    }
}
