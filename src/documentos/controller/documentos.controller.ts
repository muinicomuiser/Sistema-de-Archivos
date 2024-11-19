import { Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Documentos')
@Controller('documentos')
export class DocumentosController {

    @Post(':rut_usuario')
    cargarDocumentos(@Param('rut_usuario') rutUsuario: string) {
        return 'Qué tal'
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
