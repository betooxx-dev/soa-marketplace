import {
  IsEnum,
  IsOptional,
  IsNumber,
  IsPositive,
  IsString,
  MinLength,
} from 'class-validator';
import { Type } from 'class-transformer';
import { EstadoAnuncio } from '../../domain/value-objects/enums';

export class UpdateAnuncioDto {
  @IsOptional()
  @IsString()
  @MinLength(5)
  titulo?: string;

  @IsOptional()
  @IsString()
  @MinLength(10)
  descripcion?: string;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  @Type(() => Number)
  precioCantidad?: number;

  @IsOptional()
  @IsEnum(EstadoAnuncio)
  estado?: EstadoAnuncio;
}
