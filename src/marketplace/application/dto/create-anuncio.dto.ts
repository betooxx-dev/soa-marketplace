import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  MinLength,
} from 'class-validator';
import { Type } from 'class-transformer';
import { Categoria } from '../../domain/value-objects/enums';

export class CreateAnuncioDto {
  @IsString()
  @IsNotEmpty()
  vendedorId: string;

  @IsString()
  @MinLength(5)
  titulo: string;

  @IsString()
  @MinLength(10)
  descripcion: string;

  @IsNumber()
  @IsPositive()
  @Type(() => Number)
  precioCantidad: number;

  @IsString()
  @IsNotEmpty()
  precioMoneda: string = 'USD';

  @IsEnum(Categoria)
  categoria: Categoria;

  @IsNumber()
  @Type(() => Number)
  ubicacionLatitud: number;

  @IsNumber()
  @Type(() => Number)
  ubicacionLongitud: number;

  @IsString()
  @IsNotEmpty()
  ubicacionDireccion: string;
}
