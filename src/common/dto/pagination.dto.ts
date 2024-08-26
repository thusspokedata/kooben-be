import { Type } from 'class-transformer';
import { IsOptional, IsPositive, Min } from 'class-validator';

// by default dtos dont transform the values, so we need to use the Type decorator to do it
export class PaginationDto {
  @IsOptional()
  @IsPositive()
  @Type(() => Number) // this is to transform the value to a number
  limit?: number;

  @IsOptional()
  @Type(() => Number)
  @Min(0)
  offset?: number;
}
