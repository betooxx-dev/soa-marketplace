import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('anuncios')
export class AnuncioTypeORM {
  @PrimaryColumn('uuid')
  anuncioId: string;

  @Column('uuid')
  vendedorId: string;

  @Column({ length: 200 })
  titulo: string;

  @Column('text')
  descripcion: string;

  @Column('decimal', { precision: 10, scale: 2 })
  precioCantidad: number;

  @Column({ length: 3, default: 'USD' })
  precioMoneda: string;

  @Column({
    type: 'enum',
    enum: [
      'electronica',
      'vehiculos',
      'hogar',
      'ropa',
      'deportes',
      'libros',
      'otros',
    ],
  })
  categoria: string;

  @Column('decimal', { precision: 10, scale: 8 })
  ubicacionLatitud: number;

  @Column('decimal', { precision: 11, scale: 8 })
  ubicacionLongitud: number;

  @Column({ length: 300 })
  ubicacionDireccion: string;

  @Column({
    type: 'enum',
    enum: ['activo', 'vendido', 'suspendido'],
    default: 'activo',
  })
  estado: string;

  @CreateDateColumn()
  fechaCreacion: Date;

  @UpdateDateColumn()
  fechaActualizacion: Date;
}
