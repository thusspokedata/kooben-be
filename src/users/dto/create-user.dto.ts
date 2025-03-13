import { IsString, IsEmail, IsOptional, IsEnum } from 'class-validator';
import { Role } from '../enums/role.enum';

export class CreateUserDto {
  @IsString()
  clerkId: string;

  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsEnum(Role)
  @IsOptional()
  role?: Role;
}
