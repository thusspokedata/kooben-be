import { Transform, Type } from 'class-transformer';
import {
  IsArray,
  IsIn,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { CreateProductSizeDto } from './create-product-size.dto';

export class CreateProductDto {
  @IsString()
  @MinLength(3)
  title: string;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  @Transform(({ value }) => parseFloat(value))
  price?: number;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  slug?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateProductSizeDto)
  productSizes: CreateProductSizeDto[];

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
  tags: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  images?: string[];
}
