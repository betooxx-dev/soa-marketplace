import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  ParseUUIDPipe,
} from '@nestjs/common';
import { OfertaService } from '../../application/services/oferta.service';
import { CreateOfertaDto } from '../../application/dto/create-oferta.dto';

@Controller('ofertas')
export class OfertaController {
  constructor(private readonly ofertaService: OfertaService) {}

  @Post()
  create(@Body() createOfertaDto: CreateOfertaDto) {
    return this.ofertaService.create(createOfertaDto);
  }

  @Get('anuncio/:anuncioId')
  findByAnuncio(@Param('anuncioId', ParseUUIDPipe) anuncioId: string) {
    return this.ofertaService.findByAnuncio(anuncioId);
  }

  @Get('comprador/:compradorId')
  findByComprador(@Param('compradorId', ParseUUIDPipe) compradorId: string) {
    return this.ofertaService.findByComprador(compradorId);
  }

  @Patch(':id/aceptar')
  aceptar(@Param('id', ParseUUIDPipe) id: string) {
    return this.ofertaService.aceptarOferta(id);
  }

  @Patch(':id/rechazar')
  rechazar(@Param('id', ParseUUIDPipe) id: string) {
    return this.ofertaService.rechazarOferta(id);
  }
}
