import { IsString, IsBoolean, IsOptional } from 'class-validator';

export class AddressDto {
  @IsString()
  address: string;

  @IsString()
  zipCode: string;

  @IsString()
  city: string;

  @IsString()
  province: string;

  @IsBoolean()
  @IsOptional()
  isDefault?: boolean;
}
