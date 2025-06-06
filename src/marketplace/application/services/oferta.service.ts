import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { Oferta } from '../../domain/entities/oferta.entity';
import { OfertaRepository } from '../../domain/repositories/oferta.repository';
import { CreateOfertaDto } from '../dto/create-oferta.dto';
import { Precio } from '../../domain/value-objects/precio.vo';

@Injectable()
export class OfertaService {
  constructor(
    @Inject('OfertaRepository')
    private readonly ofertaRepository: OfertaRepository,
  ) {}

  async create(createOfertaDto: CreateOfertaDto): Promise<Oferta> {
    const precio = new Precio(
      createOfertaDto.precioOfertadoCantidad,
      createOfertaDto.precioOfertadoMoneda,
    );

    const oferta = new Oferta(
      createOfertaDto.anuncioId,
      createOfertaDto.compradorId,
      precio,
      createOfertaDto.mensaje,
    );

    return this.ofertaRepository.save(oferta);
  }

  async findByAnuncio(anuncioId: string): Promise<Oferta[]> {
    return this.ofertaRepository.findByAnuncio(anuncioId);
  }

  async findByComprador(compradorId: string): Promise<Oferta[]> {
    return this.ofertaRepository.findByComprador(compradorId);
  }

  async aceptarOferta(ofertaId: string): Promise<Oferta> {
    const oferta = await this.ofertaRepository.findById(ofertaId);
    if (!oferta)
      throw new NotFoundException(`Oferta con ID ${ofertaId} no encontrada`);

    oferta.aceptar();
    return this.ofertaRepository.save(oferta);
  }

  async rechazarOferta(ofertaId: string): Promise<Oferta> {
    const oferta = await this.ofertaRepository.findById(ofertaId);
    if (!oferta)
      throw new NotFoundException(`Oferta con ID ${ofertaId} no encontrada`);

    oferta.rechazar();
    return this.ofertaRepository.save(oferta);
  }
}
