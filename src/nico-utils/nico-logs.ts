/***[** *NICO-LOGS* *]
 * 
 * En proceso.
 * Por agregar: 
 ** Instancia y almacenaje de los logs.
 ** Registro de tiempo por log. 
 ** Elegancia y coherencia.
*/

export class NicoLogs {
    //  * console.log(códigoColor, texto);     
    //  * console.log(`${códigoColor}texto colorido ${códigoReset}resto del texto en color normal`);    
    static get colorFuente() {
        return {
            negro: "\x1b[30m",
            rojo: "\x1b[31m",
            verde: "\x1b[32m",
            amarillo: "\x1b[33m",
            azul: "\x1b[34m",
            magenta: "\x1b[35m",
            cian: "\x1b[36m",
            blanco: "\x1b[37m",
        }
    }

    static get estilo() {
        return {
            reset: "\x1b[0m",
            brillo: "\x1b[1m",
            oscuro: "\x1b[2m",
            subrayado: "\x1b[4m",
            parpadeante: "\x1b[5m",
            invertido: "\x1b[7m",
            oculto: "\x1b[8m",
        }
    }
    static get colorFondo() {
        return {
            negro: "\x1b[40m",
            rojo: "\x1b[41m",
            verde: "\x1b[42m",
            amarillo: "\x1b[43m",
            azul: "\x1b[44m",
            magenta: "\x1b[45m",
            cian: "\x1b[46m",
            blanco: "\x1b[47m",
        }
    }
    /**Recibe el número del puerto del servicio e imprime el mensaje: SERVICIO ACTIVO EN EL PUERTO: <puerto> */
    static puerto(puerto: number | string): void {
        console.log(`${this.colorFuente.amarillo}${this.estilo.brillo}[*NICO-LOGS*] - ${this.colorFuente.azul}SERVICIO ACTIVO EN EL PUERTO ${this.colorFuente.amarillo}${puerto}`)
        console.log(`${this.estilo.reset}`)

    }

    /**Recibe un anuncio tipo string y un valor para crear un anuncio personalizado en la consola. Permite modificar el color de ambos elementos.*/
    static anuncioValor(anuncio: string, valor: number | string, opcionesColor?: OpcionesEstilo): void {
        let opciones: OpcionesEstilo = opcionesColor ? opcionesColor : { colorAnuncio: 'azul', colorValor: 'amarillo', estilo: 'brillo' };
        if (!opciones.colorAnuncio) opciones.colorAnuncio = 'azul';
        if (!opciones.colorValor) opciones.colorValor = 'amarillo';
        if (!opciones.estilo) opciones.estilo = 'brillo';

        const colorLog = this.colorFuente.amarillo;
        const colorAnuncio = this.colorFuente[opciones.colorAnuncio];
        const colorValor = this.colorFuente[opciones.colorValor];
        const estiloLog = this.estilo[opciones.estilo];

        console.log(`${colorLog}${estiloLog}[*NICO-LOGS*]${colorAnuncio}   ${anuncio} ${colorValor}${valor}${this.estilo.reset}`)
    }

    static rutaLocalHost(anuncio: string, puerto: number | string, path?: string, opcionesColor?: OpcionesEstilo): void {
        let opciones: OpcionesEstilo = opcionesColor ? opcionesColor : { colorAnuncio: 'azul', colorValor: 'amarillo', estilo: 'brillo' };
        if (!opciones.colorAnuncio) opciones.colorAnuncio = 'azul';
        if (!opciones.colorValor) opciones.colorValor = 'amarillo';
        if (!opciones.estilo) opciones.estilo = 'brillo';

        const colorLog = this.colorFuente.amarillo;
        const colorAnuncio = this.colorFuente[opciones.colorAnuncio];
        const colorValor = this.colorFuente[opciones.colorValor];
        const estiloLog = this.estilo[opciones.estilo];
        const ruta: string = path != undefined ? `http://localhost:${puerto}/${path}` : `http://localhost:${puerto}`;

        console.log(`${colorLog}${estiloLog}[*NICO-LOGS*]${colorAnuncio}   ${anuncio} ${colorValor}${this.estilo.subrayado}${ruta}${this.estilo.reset}`)
    }
}

type NicoLogsColores = keyof typeof NicoLogs.colorFuente;
type NicoLogsEstilos = keyof typeof NicoLogs.estilo;
interface OpcionesEstilo {
    colorAnuncio?: NicoLogsColores,
    colorValor?: NicoLogsColores;
    estilo?: NicoLogsEstilos
}