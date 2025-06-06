import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateOfertaDto {
  @IsString()
  @IsNotEmpty()
  anuncioId: string;

  @IsString()
  @IsNotEmpty()
  compradorId: string;

  @IsNumber()
  @IsPositive()
  @Type(() => Number)
  precioOfertadoCantidad: number;

  @IsString()
  @IsNotEmpty()
  precioOfertadoMoneda: string = 'USD';

  @IsOptional()
  @IsString()
  mensaje?: string;
}
