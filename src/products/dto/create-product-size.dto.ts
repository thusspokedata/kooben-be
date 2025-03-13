import { IsInt, IsPositive, IsString, MinLength } from 'class-validator';

export class CreateProductSizeDto {
  @IsString()
  @MinLength(2)
  size: string;

  @IsInt()
  @IsPositive()
  stock: number;
}
