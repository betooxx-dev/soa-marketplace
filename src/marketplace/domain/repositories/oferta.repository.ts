import { Oferta } from '../entities/oferta.entity';
import { EstadoOferta } from '../value-objects/enums';

export interface OfertaRepository {
  save(oferta: Oferta): Promise<Oferta>;
  findById(ofertaId: string): Promise<Oferta | null>;
  findByAnuncio(anuncioId: string): Promise<Oferta[]>;
  findByComprador(compradorId: string): Promise<Oferta[]>;
  findByEstado(estado: EstadoOferta): Promise<Oferta[]>;
  delete(ofertaId: string): Promise<void>;
}
