import {
  Injectable,
  NotFoundException,
  BadRequestException,
  Inject,
} from '@nestjs/common';
import { Oferta } from '../../domain/entities/oferta.entity';
import { OfertaRepository } from '../../domain/repositories/oferta.repository';
import { AnuncioRepository } from '../../domain/repositories/anuncio.repository';
import { CreateOfertaDto } from '../dto/create-oferta.dto';
import { Precio } from '../../domain/value-objects/precio.vo';
import { EstadoAnuncio, EstadoOferta } from '../../domain/value-objects/enums';

@Injectable()
export class OfertaService {
  constructor(
    @Inject('OfertaRepository') private readonly ofertaRepository: OfertaRepository,
    @Inject('AnuncioRepository') private readonly anuncioRepository: AnuncioRepository,
  ) {}

  async create(createOfertaDto: CreateOfertaDto): Promise<Oferta> {
    const anuncio = await this.anuncioRepository.findById(
      createOfertaDto.anuncioId,
    );
    if (!anuncio)
      throw new NotFoundException(
        `Anuncio con ID ${createOfertaDto.anuncioId} no encontrado`,
      );

    if (anuncio.estado !== EstadoAnuncio.ACTIVO)
      throw new BadRequestException(
        'No se pueden hacer ofertas en anuncios inactivos',
      );

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
