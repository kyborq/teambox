import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { WorkspacesService } from './workspaces.service';
import { UserId } from 'src/common/decorators/user-id.decorator';
import { AccessTokenGuard } from 'src/common/guards/access-token.guard';
import { CreateWorkSpaceDto } from './dtos/create-workspace.dto';

@Controller('workspaces')
@UseGuards(AccessTokenGuard)
export class WorkspacesController {
  constructor(private workspacesService: WorkspacesService) {}

  @Get()
  getOwnedWorkspaces(@UserId() userId: string) {
    return this.workspacesService.getUserWorkspaces(userId);
  }

  @Get(':workspace')
  getWorkspace(@Param('workspace') workspace: string) {
    return this.workspacesService.getWorkspaceById(workspace);
  }

  @Post()
  createWorkspace(
    @UserId() userId: string,
    @Body() createWorkspaceDto: CreateWorkSpaceDto,
  ) {
    return this.workspacesService.createWorkspace(userId, createWorkspaceDto);
  }
}
