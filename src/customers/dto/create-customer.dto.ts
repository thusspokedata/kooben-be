import { IsString, IsEmail, IsOptional, IsBoolean } from 'class-validator';

export class CreateCustomerDto {
  @IsString()
  clerkId: string;

  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  address?: string;

  @IsString()
  zipCode?: string;

  @IsString()
  city?: string;

  @IsString()
  province?: string;

  @IsString()
  @IsOptional()
  phone?: string;

  @IsBoolean()
  @IsOptional()
  rememberAddress?: boolean;
}
