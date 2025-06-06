import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsuarioTypeORM } from './infrastructure/persistence/typeorm/usuario.typeorm';
import { AnuncioTypeORM } from './infrastructure/persistence/typeorm/anuncio.typeorm';
import { OfertaTypeORM } from './infrastructure/persistence/typeorm/oferta.typeorm';

import { AnuncioService } from './application/services/anuncio.service';
import { OfertaService } from './application/services/oferta.service';
import { UsuarioService } from './application/services/usuario.service';
import { AnuncioController } from './infrastructure/controllers/anuncio.controller';
import { OfertaController } from './infrastructure/controllers/oferta.controller';
import { UsuarioController } from './infrastructure/controllers/usuario.controller';

import { UsuarioRepositoryImpl } from './infrastructure/persistence/repositories/usuario.repository.impl';
import { AnuncioRepositoryImpl } from './infrastructure/persistence/repositories/anuncio.repository.impl';
import { OfertaRepositoryImpl } from './infrastructure/persistence/repositories/oferta.repository.impl';

@Module({
  imports: [
    TypeOrmModule.forFeature([UsuarioTypeORM, AnuncioTypeORM, OfertaTypeORM]),
  ],
  controllers: [AnuncioController, OfertaController, UsuarioController],
  providers: [
    AnuncioService,
    OfertaService,
    UsuarioService,
    {
      provide: 'UsuarioRepository',
      useClass: UsuarioRepositoryImpl,
    },
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
