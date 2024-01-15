import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { WorkspacesService } from 'src/workspaces/workspaces.service';

@Injectable()
export class WorkspaceOwnerGuard implements CanActivate {
  constructor(private workspaceService: WorkspacesService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const workspaceId = request.body.workspaceId;

    if (!user || !workspaceId) {
      return false;
    }

    const workspace = await this.workspaceService.getWorkspaceById(workspaceId);

    if (!workspace) {
      return false;
    }

    return workspace.owner.toString() === user._id.toString();
  }
}
