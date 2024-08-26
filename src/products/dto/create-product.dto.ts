// this is how I am waiting for the data to be sent to me
// dto means "data transfer object"
// npm i class-validator class-transformer

import {
  IsArray,
  IsIn,
  IsInt,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateProductDto {
  @IsString()
  @MinLength(3)
  title: string;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  price?: number;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  slug?: string;

  @IsInt()
  @IsPositive()
  @IsOptional()
  stock?: number;

  @IsString({ each: true })
  @IsArray()
  sizes: string[];

  @IsIn([
    'botinero',
    'respaldo_de_cama',
    'mesa_de_luz',
    'escritorio',
    'mesa_tv',
  ])
  category: string;

  @IsString({ each: true })
  @IsArray()
  @IsOptional()
  color?: string[];

  @IsString()
  @IsOptional()
  material?: string;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  length?: number;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  width?: number;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  height?: number;

  @IsString({ each: true })
  @IsArray()
  @IsOptional()
  images?: string[];
}
