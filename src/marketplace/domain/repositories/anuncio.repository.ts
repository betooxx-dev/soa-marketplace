import { Anuncio } from '../entities/anuncio.entity';
import { Categoria, EstadoAnuncio } from '../value-objects/enums';

export interface AnuncioRepository {
  save(anuncio: Anuncio): Promise<Anuncio>;
  findById(anuncioId: string): Promise<Anuncio | null>;
  findByVendedor(vendedorId: string): Promise<Anuncio[]>;
  findByCategoria(categoria: Categoria): Promise<Anuncio[]>;
  findByEstado(estado: EstadoAnuncio): Promise<Anuncio[]>;
  findAll(): Promise<Anuncio[]>;
  delete(anuncioId: string): Promise<void>;
}
