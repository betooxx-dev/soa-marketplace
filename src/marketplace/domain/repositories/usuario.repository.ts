import { Usuario } from '../entities/usuario.entity';

export interface UsuarioRepository {
  save(usuario: Usuario): Promise<Usuario>;
  findById(usuarioId: string): Promise<Usuario | null>;
  findByEmail(email: string): Promise<Usuario | null>;
  findAll(): Promise<Usuario[]>;
  delete(usuarioId: string): Promise<void>;
}
