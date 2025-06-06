import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Anuncio } from '../../../domain/entities/anuncio.entity';
import { AnuncioRepository } from '../../../domain/repositories/anuncio.repository';
import { AnuncioTypeORM } from '../typeorm/anuncio.typeorm';
import { Precio } from '../../../domain/value-objects/precio.vo';
import { Ubicacion } from '../../../domain/value-objects/ubicacion.vo';
import { Categoria, EstadoAnuncio } from '../../../domain/value-objects/enums';

@Injectable()
export class AnuncioRepositoryImpl implements AnuncioRepository {
  constructor(
    @InjectRepository(AnuncioTypeORM)
    private readonly ormRepository: Repository<AnuncioTypeORM>,
  ) {}

  async save(anuncio: Anuncio): Promise<Anuncio> {
    const ormEntity = this.toOrmEntity(anuncio);
    const saved = await this.ormRepository.save(ormEntity);
    return this.toDomainEntity(saved);
  }

  async findById(anuncioId: string): Promise<Anuncio | null> {
    const found = await this.ormRepository.findOne({ where: { anuncioId } });
    return found ? this.toDomainEntity(found) : null;
  }

  async findByVendedor(vendedorId: string): Promise<Anuncio[]> {
    const entities = await this.ormRepository.find({ where: { vendedorId } });
    return entities.map((entity) => this.toDomainEntity(entity));
  }

  async findByCategoria(categoria: Categoria): Promise<Anuncio[]> {
    const entities = await this.ormRepository.find({ where: { categoria } });
    return entities.map((entity) => this.toDomainEntity(entity));
  }

  async findByEstado(estado: EstadoAnuncio): Promise<Anuncio[]> {
    const entities = await this.ormRepository.find({ where: { estado } });
    return entities.map((entity) => this.toDomainEntity(entity));
  }

  async findAll(): Promise<Anuncio[]> {
    const entities = await this.ormRepository.find();
    return entities.map((entity) => this.toDomainEntity(entity));
  }

  async delete(anuncioId: string): Promise<void> {
    await this.ormRepository.delete(anuncioId);
  }

  private toOrmEntity(anuncio: Anuncio): AnuncioTypeORM {
    const ormEntity = new AnuncioTypeORM();
    ormEntity.anuncioId = anuncio.anuncioId;
    ormEntity.vendedorId = anuncio.vendedorId;
    ormEntity.titulo = anuncio.titulo;
    ormEntity.descripcion = anuncio.descripcion;
    ormEntity.precioCantidad = anuncio.precio.cantidad;
    ormEntity.precioMoneda = anuncio.precio.moneda;
    ormEntity.categoria = anuncio.categoria;
    ormEntity.ubicacionLatitud = anuncio.ubicacion.latitud;
    ormEntity.ubicacionLongitud = anuncio.ubicacion.longitud;
    ormEntity.ubicacionDireccion = anuncio.ubicacion.direccion;
    ormEntity.estado = anuncio.estado;
    ormEntity.fechaCreacion = anuncio.fechaCreacion;
    ormEntity.fechaActualizacion = anuncio.fechaActualizacion;
    return ormEntity;
  }

  private toDomainEntity(ormEntity: AnuncioTypeORM): Anuncio {
    const precio = new Precio(ormEntity.precioCantidad, ormEntity.precioMoneda);
    const ubicacion = new Ubicacion(
      ormEntity.ubicacionLatitud,
      ormEntity.ubicacionLongitud,
      ormEntity.ubicacionDireccion,
    );

    return new Anuncio(
      ormEntity.vendedorId,
      ormEntity.titulo,
      ormEntity.descripcion,
      precio,
      ormEntity.categoria as Categoria,
      ubicacion,
      ormEntity.estado as EstadoAnuncio,
      ormEntity.fechaCreacion,
      ormEntity.fechaActualizacion,
      ormEntity.anuncioId,
    );
  }
}
