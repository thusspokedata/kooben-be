import { clerkClient } from '@clerk/express';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
} from '@nestjs/common';

@Injectable()
export class ClerkAuthGuard implements CanActivate {
  private readonly logger = new Logger(ClerkAuthGuard.name);

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.cookies.__session;

    try {
      await clerkClient.sessions.getSession(token);
    } catch (error) {
      this.logger.error('Token verification failed', error);
      return false;
    }
    return true;
  }
}
