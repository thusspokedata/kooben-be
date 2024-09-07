import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ClerkAuthGuard } from './clerk-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  @UseGuards(ClerkAuthGuard)
  async getUsers() {
    return this.authService.getUsers();
  }
}
