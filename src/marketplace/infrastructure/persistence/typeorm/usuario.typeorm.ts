import { Entity, PrimaryColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('usuarios')
export class UsuarioTypeORM {
  @PrimaryColumn('uuid')
  usuarioId: string;

  @Column({ length: 100 })
  nombre: string;

  @Column({ unique: true, length: 150 })
  email: string;

  @Column({ nullable: true, length: 20 })
  telefono?: string;

  @CreateDateColumn()
  fechaRegistro: Date;
}
