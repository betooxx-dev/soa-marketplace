import { Entity, PrimaryColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('ofertas')
export class OfertaTypeORM {
  @PrimaryColumn('uuid')
  ofertaId: string;

  @Column('uuid')
  anuncioId: string;

  @Column('uuid')
  compradorId: string;

  @Column('decimal', { precision: 10, scale: 2 })
  precioOfertadoCantidad: number;

  @Column({ length: 3, default: 'USD' })
  precioOfertadoMoneda: string;

  @Column('text', { nullable: true })
  mensaje?: string;

  @Column({
    type: 'enum',
    enum: ['pendiente', 'aceptada', 'rechazada'],
    default: 'pendiente',
  })
  estado: string;

  @CreateDateColumn()
  fechaCreacion: Date;
}
