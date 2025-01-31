import { Injectable } from '@nestjs/common';
import { clerkClient } from '@clerk/express';

@Injectable()
export class AuthService {
  async getUsers() {
    return clerkClient.users.getUserList();
  }
}
