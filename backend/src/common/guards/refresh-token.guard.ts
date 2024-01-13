import {
  ExecutionContext,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class RefreshTokenGuard extends AuthGuard('jwt-refresh') {
  handleRequest<TUser = any>(
    err: any,
    user: any,
    info: any,
    context: ExecutionContext,
    status?: any,
  ) {
    if (!user) {
      throw new NotFoundException('Your custom message here');
    }
    return user;
  }
}
