import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Anuncio } from '../../domain/entities/anuncio.entity';
import { AnuncioRepository } from '../../domain/repositories/anuncio.repository';
import { CreateAnuncioDto } from '../dto/create-anuncio.dto';
import { UpdateAnuncioDto } from '../dto/update-anuncio.dto';
import { Precio } from '../../domain/value-objects/precio.vo';
import { Ubicacion } from '../../domain/value-objects/ubicacion.vo';
import { Categoria } from '../../domain/value-objects/enums';

@Injectable()
export class AnuncioService {
  constructor(
    @Inject('AnuncioRepository')
    private readonly anuncioRepository: AnuncioRepository,
  ) {}

  async create(createAnuncioDto: CreateAnuncioDto): Promise<Anuncio> {
    const precio = new Precio(
      createAnuncioDto.precioCantidad,
      createAnuncioDto.precioMoneda,
    );
    const ubicacion = new Ubicacion(
      createAnuncioDto.ubicacionLatitud,
      createAnuncioDto.ubicacionLongitud,
      createAnuncioDto.ubicacionDireccion,
    );

    const anuncio = new Anuncio(
      createAnuncioDto.vendedorId,
      createAnuncioDto.titulo,
      createAnuncioDto.descripcion,
      precio,
      createAnuncioDto.categoria,
      ubicacion,
    );

    return this.anuncioRepository.save(anuncio);
  }

  async findAll(): Promise<Anuncio[]> {
    return this.anuncioRepository.findAll();
  }

  async findOne(id: string): Promise<Anuncio> {
    const anuncio = await this.anuncioRepository.findById(id);
    if (!anuncio) {
      throw new NotFoundException(`Anuncio con ID ${id} no encontrado`);
    }
    return anuncio;
  }

  async findByVendedor(vendedorId: string): Promise<Anuncio[]> {
    return this.anuncioRepository.findByVendedor(vendedorId);
  }

  async findByCategoria(categoria: Categoria): Promise<Anuncio[]> {
    return this.anuncioRepository.findByCategoria(categoria);
  }

  async update(
    id: string,
    updateAnuncioDto: UpdateAnuncioDto,
  ): Promise<Anuncio> {
    const anuncio = await this.findOne(id);

    // Crear nuevo anuncio con valores actualizados
    const precio = updateAnuncioDto.precioCantidad
      ? new Precio(updateAnuncioDto.precioCantidad, anuncio.precio.moneda)
      : anuncio.precio;

    const anuncioActualizado = new Anuncio(
      anuncio.vendedorId,
      updateAnuncioDto.titulo || anuncio.titulo,
      updateAnuncioDto.descripcion || anuncio.descripcion,
      precio,
      anuncio.categoria,
      anuncio.ubicacion,
      updateAnuncioDto.estado || anuncio.estado,
      anuncio.fechaCreacion,
      new Date(),
      anuncio.anuncioId,
    );

    return this.anuncioRepository.save(anuncioActualizado);
  }

  async remove(id: string): Promise<void> {
    await this.findOne(id);
    return this.anuncioRepository.delete(id);
  }
}
