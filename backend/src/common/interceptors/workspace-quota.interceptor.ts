import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { WorkspacesService } from 'src/workspaces/workspaces.service';

@Injectable()
export class WorkspaceQuotaInterceptor implements NestInterceptor {
  constructor(private readonly workspacesService: WorkspacesService) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();
    const userId = request.user.sub;

    const canCreate = await this.workspacesService.canCreateWorkspace(userId);

    if (!canCreate) {
      throw new HttpException('Workspace quota exceeded', HttpStatus.FORBIDDEN);
    }

    return next.handle();
  }
}
