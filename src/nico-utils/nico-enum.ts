/**Clase con útiles para enums. */
export class NicoEnum {

    /**Retorna un string con los valores de un enum.*/
    static enumValores(enumEntrada: {}): string {
        let valores: string = "";
        let valoresObjeto = Object.values(enumEntrada)
        for (let valor of valoresObjeto) {
            valores += valor + ', ';
        }
        valores = valores.slice(0, valores.length - 2)
        return valores
    }

    static tablaAObjeto<T>(tabla: T[], nombreClave: string, nombreValor: string) {

        const objetoTabla = {}
        for (let entrada of tabla) {
            // objetoTabla[removerAcentos(entrada[nombreClave])] = entrada[nombreValor]
            objetoTabla[(entrada[nombreClave])] = entrada[nombreValor]
        }
        return objetoTabla
    }
}
// type GamesKeys = keyof typeof GAMES;
// refiere al tipo de dato de los valores de cada propiedad. Para cada propiedad, GamesValueTypes asumirá el tipo de dato de su valor
// type GamesValueTypes = (typeof GAMES)[keyof typeof GAMES];
function removerAcentos(str: string): string {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
}
const removeAccents = str => str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
