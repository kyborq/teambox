import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { WorkspacesService } from 'src/workspaces/workspaces.service';

@Injectable()
export class WorkspaceOwnerGuard implements CanActivate {
  constructor(private readonly workspacesService: WorkspacesService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const workspaceId = request.params.workspace;
    const userId = request.user.sub;

    const workspace = await this.workspacesService.getWorkspace(workspaceId);

    if (!workspace) {
      throw new UnauthorizedException('Workspace not found');
    }

    const isOwner = workspace.owner.toString() === userId.toString();

    if (!isOwner) {
      throw new UnauthorizedException('User is not the owner of the workspace');
    }

    return true;
  }
}
