import { Column, Entity, PrimaryColumn } from "typeorm";
@Entity({ name: 'productos' })
export class Documento {
    @Column({ name: 'rut' })
    rut: string;
    @Column({ name: 'nombre_original' })
    nombreOriginal: string;
    @PrimaryColumn({ name: 'nombre_asignado' })
    nombreAsignado: string;
    @PrimaryColumn({ name: 'ruta_servidor' })
    rutaServidor: string;
    @Column({ name: 'fecha_hora' })
    fechaHoraCarga: string;
}