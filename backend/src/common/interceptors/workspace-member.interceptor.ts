import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { MembersService } from 'src/members/members.service';

@Injectable()
export class WorkspaceMemberInterceptor implements NestInterceptor {
  constructor(private readonly membersService: MembersService) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();
    const user = request.user.sub;
    const workspace = request.params.workspace;

    const isMember = await this.membersService.isMemberOfWorkspace(
      user,
      workspace,
    );
    if (!isMember) {
      throw new HttpException(
        'Access denied: Current user is not a member of this workspace.',
        HttpStatus.FORBIDDEN,
      );
    }

    return next.handle();
  }
}
