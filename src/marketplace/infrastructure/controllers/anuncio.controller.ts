import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  Query,
} from '@nestjs/common';
import { AnuncioService } from '../../application/services/anuncio.service';
import { CreateAnuncioDto } from '../../application/dto/create-anuncio.dto';
import { UpdateAnuncioDto } from '../../application/dto/update-anuncio.dto';
import { Categoria } from '../../domain/value-objects/enums';

@Controller('anuncios')
export class AnuncioController {
  constructor(private readonly anuncioService: AnuncioService) {}

  @Post()
  create(@Body() createAnuncioDto: CreateAnuncioDto) {
    return this.anuncioService.create(createAnuncioDto);
  }

  @Get()
  findAll(@Query('categoria') categoria?: Categoria) {
    if (categoria) {
      return this.anuncioService.findByCategoria(categoria);
    }
    return this.anuncioService.findAll();
  }

  @Get('vendedor/:vendedorId')
  findByVendedor(@Param('vendedorId', ParseUUIDPipe) vendedorId: string) {
    return this.anuncioService.findByVendedor(vendedorId);
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.anuncioService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateAnuncioDto: UpdateAnuncioDto,
  ) {
    return this.anuncioService.update(id, updateAnuncioDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.anuncioService.remove(id);
  }
}
