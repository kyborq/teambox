import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { WorkspacesService } from 'src/workspaces/workspaces.service';

@Injectable()
export class WorkspacePersonalGuard implements CanActivate {
  constructor(private workspaceService: WorkspacesService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();

    const userId = request.user['sub'];

    const workspaceId = request.params.workspace;

    if (!userId || !workspaceId) {
      return false;
    }

    const workspace = await this.workspaceService.getWorkspaceById(workspaceId);

    if (!workspace) {
      return false;
    }

    return !workspace.isPersonal;
  }
}
