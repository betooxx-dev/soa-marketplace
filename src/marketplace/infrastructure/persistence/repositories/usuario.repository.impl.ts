import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from '../../../domain/entities/usuario.entity';
import { UsuarioRepository } from '../../../domain/repositories/usuario.repository';
import { UsuarioTypeORM } from '../typeorm/usuario.typeorm';

@Injectable()
export class UsuarioRepositoryImpl implements UsuarioRepository {
  constructor(
    @InjectRepository(UsuarioTypeORM)
    private readonly ormRepository: Repository<UsuarioTypeORM>,
  ) {}

  async save(usuario: Usuario): Promise<Usuario> {
    const ormEntity = this.toOrmEntity(usuario);
    const saved = await this.ormRepository.save(ormEntity);
    return this.toDomainEntity(saved);
  }

  async findById(usuarioId: string): Promise<Usuario | null> {
    const found = await this.ormRepository.findOne({ where: { usuarioId } });
    return found ? this.toDomainEntity(found) : null;
  }

  async findByEmail(email: string): Promise<Usuario | null> {
    const found = await this.ormRepository.findOne({ where: { email } });
    return found ? this.toDomainEntity(found) : null;
  }

  async findAll(): Promise<Usuario[]> {
    const entities = await this.ormRepository.find();
    return entities.map((entity) => this.toDomainEntity(entity));
  }

  async delete(usuarioId: string): Promise<void> {
    await this.ormRepository.delete(usuarioId);
  }

  private toOrmEntity(usuario: Usuario): UsuarioTypeORM {
    const ormEntity = new UsuarioTypeORM();
    ormEntity.usuarioId = usuario.usuarioId;
    ormEntity.nombre = usuario.nombre;
    ormEntity.email = usuario.email;
    ormEntity.telefono = usuario.telefono;
    ormEntity.fechaRegistro = usuario.fechaRegistro;
    return ormEntity;
  }

  private toDomainEntity(ormEntity: UsuarioTypeORM): Usuario {
    return new Usuario(
      ormEntity.nombre,
      ormEntity.email,
      ormEntity.telefono,
      ormEntity.fechaRegistro,
      ormEntity.usuarioId,
    );
  }
}
