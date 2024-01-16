import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { WorkspacesService } from './workspaces.service';
import { UserId } from 'src/common/decorators/user-id.decorator';
import { AccessTokenGuard } from 'src/common/guards/access-token.guard';
import { CreateWorkSpaceDto } from './dtos/create-workspace.dto';
import { WorkspaceQuotaInterceptor } from 'src/common/interceptors/workspace-quota.interceptor';
import { RenameWorkspaceDto } from './dtos/rename-workspace.dto';

@Controller('workspaces')
@UseGuards(AccessTokenGuard)
export class WorkspacesController {
  constructor(private workspacesService: WorkspacesService) {}

  @Get()
  getWorkspaces(@UserId() userId: string) {
    return this.workspacesService.getWorkspaces(userId);
  }

  // @Get('owned')
  // getOwnedWorkspaces(@UserId() userId: string) {
  //   return this.workspacesService.getUserWorkspaces(userId);
  // }

  @Get(':workspace')
  getWorkspace(
    @UserId() userId: string,
    @Param('workspace') workspace: string,
  ) {
    return this.workspacesService.getWorkspaceById(workspace, userId);
  }

  @Delete(':workspace')
  async deleteWorkspace(
    @UserId() userId: string,
    @Param('workspace') workspace: string,
  ) {
    return this.workspacesService.deleteWorkspace(workspace, userId);
  }

  @Post()
  @UseInterceptors(WorkspaceQuotaInterceptor)
  createWorkspace(
    @UserId() userId: string,
    @Body() createWorkspaceDto: CreateWorkSpaceDto,
  ) {
    return this.workspacesService.createWorkspace(userId, createWorkspaceDto);
  }

  @Patch(':workspace/rename')
  async renameWorkspace(
    @UserId() userId: string,
    @Param('workspace') workspace: string,
    @Body() renameWorkspaceDto: RenameWorkspaceDto,
  ) {
    return this.workspacesService.renameWorkspace(
      workspace,
      userId,
      renameWorkspaceDto.newName,
    );
  }
}
