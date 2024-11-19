import { INestApplication } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from "@nestjs/swagger";
import { NicoLogs } from "./nico-logs";
/**
 * Para ahorrarse algunos procesos de Swagger
 * 
 * Por agregar:
 ** Manejo de estilos (si es posible configurarlos)
 ** Dividir métodos que manejan demasiadas variables
 */
export class DocumentadorSwagger {
    private _subRuta: string = '';
    private aplicacion: INestApplication;
    private url: string;
    rutaDocumentacion: string;
    private config: Omit<OpenAPIObject, "paths">;
    private modulosDocumentados: Function[] = []
    private subRutasRegistradas: string[] = []
    private opcionesConfig: OpcionesConfig = {
        title: true,
        description: true,
        version: true,
        authorName: true,
        authorUrl: true,
        authoEmail: true,
        license: true,
        ambiente: true
    }

    constructor(
        aplicacion: INestApplication,
        rutaDocumentacion: string = 'api'
    ) {
        this.aplicacion = aplicacion;
        this.rutaDocumentacion = rutaDocumentacion;
        this.config = new DocumentBuilder().build();
    }

    /**Retorna un documentador para una aplicación y ruta determinada.*/
    static async documentador(
        aplicacion: INestApplication,
        rutaDocumentacion: string = 'api'
    ): Promise<DocumentadorSwagger> {
        const documentador: DocumentadorSwagger = new DocumentadorSwagger(aplicacion, rutaDocumentacion);
        documentador.url = await documentador.aplicacion.getUrl()
        return documentador
    }

    /**Define los módulos que serán documentados.
     * 
     * Por derfecto considera todos los módulos de la aplicación.
    */
    modulos(modulos?: Function[]) {
        this.modulosDocumentados = modulos;
        return this
    }

    subRuta(subRuta: string) {
        this._subRuta = `/${subRuta}`;
        return this;
    }

    moduloSubRuta(modulo: Function[], subRuta: string) {
        this.modulosDocumentados = modulo
        this._subRuta = `/${subRuta}`;
        this.subRutasRegistradas.push(`${this._subRuta}`)
        return this;
    }

    /**Lee el archivo package.json y asigna sus descripciones a la configuración de Swagger.
     * 
     * Permite definir qué descripciones considerar.
     */
    packageJson(opcionesConfiguracion?: OpcionesConfig) {
        const configService: ConfigService = this.aplicacion.get<ConfigService>(ConfigService);
        Object.assign(this.opcionesConfig, opcionesConfiguracion);
        if (this.opcionesConfig.title) {
            this.config.info.title = configService.get('npm_package_name');
        }
        if (this.opcionesConfig.description) {
            this.config.info.description = configService.get('npm_package_description');
        }
        if (this.opcionesConfig.version) {
            this.config.info.version = configService.get('npm_package_version');
        }
        if (this.opcionesConfig.authorName) {
            this.config.info.contact.name = configService.get("npm_package_author_name");
        }
        if (this.opcionesConfig.authorUrl) {
            this.config.info.contact.url = configService.get('npm_package_author_url');
        }
        if (this.opcionesConfig.authoEmail) {
            this.config.info.contact.email = configService.get('npm_package_author_email');
        }
        if (this.opcionesConfig.license) {
            this.config.info.license = configService.get('npm_package_license')
        }
        if (this.opcionesConfig.ambiente) {
            this.config.info.description += `\n \n AMBIENTE: ${configService.get('AMBIENTE')}`
        }
        return this
    }

    async logsRutas(url?: string) {
        if (url) {
            this.url = url;
        }
        else {
            this.url = await this.aplicacion.getUrl();
        }
        NicoLogs.anuncioValor('DOCUMENTACIÓN EN LA RUTA:', `${this.url}/${this.rutaDocumentacion}`, { colorAnuncio: 'verde', colorValor: 'blanco' })
        this.subRutasRegistradas.forEach(subRutaRegistrada => {
            // NicoLogs.anuncioValor(`${this.url}          `, `${this.rutaDocumentacion}${this._subRuta}`)
            NicoLogs.anuncioValor('DOCUMENTACIÓN DE MÓDULO EN LA RUTA:', `${this.url}/${this.rutaDocumentacion}${subRutaRegistrada}`, { colorAnuncio: 'verde', colorValor: 'blanco' })
        })

    }

    /**Construye la documentación con Swagger.*/
    documentar(opciones?: { logRuta?: boolean }) {
        if (opciones && opciones.logRuta) {
            if (this._subRuta) {
                NicoLogs.anuncioValor('DOCUMENTACIÓN DE MÓDULO EN LA RUTA:', `${this.rutaDocumentacion}${this._subRuta}`)
            }
            else {
                NicoLogs.anuncioValor('DOCUMENTACIÓN EN LA RUTA:', `${this.rutaDocumentacion}`)
            }
        }
        SwaggerModule.setup(
            `${this.rutaDocumentacion}${this._subRuta}`,
            this.aplicacion,
            SwaggerModule.createDocument(
                this.aplicacion,
                this.config,
                {
                    include: this.modulosDocumentados
                })
        );
        return this
    }
}