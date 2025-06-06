import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AnuncioTypeORM } from './infrastructure/persistence/typeorm/anuncio.typeorm';
import { OfertaTypeORM } from './infrastructure/persistence/typeorm/oferta.typeorm';

import { AnuncioService } from './application/services/anuncio.service';
import { OfertaService } from './application/services/oferta.service';
import { AnuncioController } from './infrastructure/controllers/anuncio.controller';
import { OfertaController } from './infrastructure/controllers/oferta.controller';

import { AnuncioRepositoryImpl } from './infrastructure/persistence/repositories/anuncio.repository.impl';
import { OfertaRepositoryImpl } from './infrastructure/persistence/repositories/oferta.repository.impl';

@Module({
  imports: [TypeOrmModule.forFeature([AnuncioTypeORM, OfertaTypeORM])],
  controllers: [AnuncioController, OfertaController],
  providers: [
    AnuncioService,
    OfertaService,
    {
      provide: 'AnuncioRepository',
      useClass: AnuncioRepositoryImpl,
    },
    {
      provide: 'OfertaRepository',
      useClass: OfertaRepositoryImpl,
    },
  ],
})
export class MarketplaceModule {}
