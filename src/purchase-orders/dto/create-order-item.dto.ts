import { IsInt, IsNumber, IsPositive, IsString, Min } from 'class-validator';

export class CreateOrderItemDto {
  @IsInt()
  @IsPositive()
  @Min(1)
  quantity: number;

  @IsNumber()
  @IsPositive()
  @Min(0)
  price: number;

  @IsString()
  productId: string;

  @IsString()
  size: string;
}
