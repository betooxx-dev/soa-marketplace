import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Oferta } from '../../../domain/entities/oferta.entity';
import { OfertaRepository } from '../../../domain/repositories/oferta.repository';
import { OfertaTypeORM } from '../typeorm/oferta.typeorm';
import { Precio } from '../../../domain/value-objects/precio.vo';
import { EstadoOferta } from '../../../domain/value-objects/enums';

@Injectable()
export class OfertaRepositoryImpl implements OfertaRepository {
  constructor(
    @InjectRepository(OfertaTypeORM)
    private readonly ormRepository: Repository<OfertaTypeORM>,
  ) {}

  async save(oferta: Oferta): Promise<Oferta> {
    const ormEntity = this.toOrmEntity(oferta);
    const saved = await this.ormRepository.save(ormEntity);
    return this.toDomainEntity(saved);
  }

  async findById(ofertaId: string): Promise<Oferta | null> {
    const found = await this.ormRepository.findOne({ where: { ofertaId } });
    return found ? this.toDomainEntity(found) : null;
  }

  async findByAnuncio(anuncioId: string): Promise<Oferta[]> {
    const entities = await this.ormRepository.find({ where: { anuncioId } });
    return entities.map((entity) => this.toDomainEntity(entity));
  }

  async findByComprador(compradorId: string): Promise<Oferta[]> {
    const entities = await this.ormRepository.find({ where: { compradorId } });
    return entities.map((entity) => this.toDomainEntity(entity));
  }

  async findByEstado(estado: EstadoOferta): Promise<Oferta[]> {
    const entities = await this.ormRepository.find({ where: { estado } });
    return entities.map((entity) => this.toDomainEntity(entity));
  }

  async delete(ofertaId: string): Promise<void> {
    await this.ormRepository.delete(ofertaId);
  }

  private toOrmEntity(oferta: Oferta): OfertaTypeORM {
    const ormEntity = new OfertaTypeORM();
    ormEntity.ofertaId = oferta.ofertaId;
    ormEntity.anuncioId = oferta.anuncioId;
    ormEntity.compradorId = oferta.compradorId;
    ormEntity.precioOfertadoCantidad = oferta.precioOfertado.cantidad;
    ormEntity.precioOfertadoMoneda = oferta.precioOfertado.moneda;
    ormEntity.mensaje = oferta.mensaje;
    ormEntity.estado = oferta.estado;
    ormEntity.fechaCreacion = oferta.fechaCreacion;
    return ormEntity;
  }

  private toDomainEntity(ormEntity: OfertaTypeORM): Oferta {
    const precio = new Precio(
      ormEntity.precioOfertadoCantidad,
      ormEntity.precioOfertadoMoneda,
    );

    return new Oferta(
      ormEntity.anuncioId,
      ormEntity.compradorId,
      precio,
      ormEntity.mensaje,
      ormEntity.estado as EstadoOferta,
      ormEntity.fechaCreacion,
      ormEntity.ofertaId,
    );
  }
}
