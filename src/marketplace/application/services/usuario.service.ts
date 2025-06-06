import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Usuario } from '../../domain/entities/usuario.entity';
import { UsuarioRepository } from '../../domain/repositories/usuario.repository';
import { CreateUsuarioDto } from '../dto/create-usuario.dto';

@Injectable()
export class UsuarioService {
  constructor(@Inject('UsuarioRepository') private readonly usuarioRepository: UsuarioRepository) {}

  async create(createUsuarioDto: CreateUsuarioDto): Promise<Usuario> {
    const usuario = new Usuario(
      createUsuarioDto.nombre,
      createUsuarioDto.email,
      createUsuarioDto.telefono,
    );
    return this.usuarioRepository.save(usuario);
  }

  async findAll(): Promise<Usuario[]> {
    return this.usuarioRepository.findAll();
  }

  async findOne(id: string): Promise<Usuario> {
    const usuario = await this.usuarioRepository.findById(id);
    if (!usuario) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    }
    return usuario;
  }

  async remove(id: string): Promise<void> {
    await this.findOne(id); // Verifica que existe
    return this.usuarioRepository.delete(id);
  }
}
