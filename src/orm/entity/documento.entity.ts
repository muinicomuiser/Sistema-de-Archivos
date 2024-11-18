import { Column, Entity } from "typeorm";
@Entity({ name: 'productos' })
export class Documento {
    @Column({ name: 'rut' })
    rut: string;
    @Column({ name: 'nombre_original' })
    nombreOriginal: string;
    @Column({ name: 'nombre_asignado' })
    nombreAsignado: string;
    @Column({ name: 'ruta_servidor' })
    rutaServidor: string;
    @Column({ name: 'fecha_hora' })
    fechaHoraCarga: string;
}