import { Column, Entity, PrimaryColumn } from 'typeorm';
@Entity({ name: 'documentos' })
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
  fechaHoraCarga: Date;

  setRut(rut: string): Documento {
    this.rut = rut;
    return this;
  }
  setNombreOriginal(nombre: string): Documento {
    this.nombreOriginal = nombre;
    return this;
  }
  setNombreAsignado(nombre: string): Documento {
    this.nombreAsignado = nombre;
    return this;
  }
  setRutaServidor(ruta: string): Documento {
    this.rutaServidor = ruta;
    return this;
  }
  setFechaHoraCarga(fecha: Date): Documento {
    this.fechaHoraCarga = fecha;
    return this;
  }
}
