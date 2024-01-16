import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { MembersService } from './members.service';
import { AccessTokenGuard } from 'src/common/guards/access-token.guard';
import { UserId } from 'src/common/decorators/user-id.decorator';
import { WorkspaceMemberInterceptor } from 'src/common/interceptors/workspace-member.interceptor';
import { WorkspaceOwnerGuard } from 'src/common/guards/workspace-owner.guard';

@Controller('members')
@UseGuards(AccessTokenGuard)
export class MembersController {
  constructor(private membersService: MembersService) {}

  @Get(':workspace')
  @UseInterceptors(WorkspaceMemberInterceptor)
  async getWorkspaceMembers(@Param('workspace') workspace: string) {
    return this.membersService.findMembers(workspace);
  }

  @Post(':workspace/:user')
  @UseGuards(WorkspaceOwnerGuard)
  async createMember(
    @Param('workspace') workspace: string,
    @Param('user') user: string,
  ) {
    return await this.membersService.createMember(user, workspace);
  }

  @Delete(':workspace/:user')
  @UseGuards(WorkspaceOwnerGuard)
  async removeMember(
    @Param('user') user: string,
    @Param('workspace') workspace: string,
  ) {
    return await this.membersService.removeMember(user, workspace);
  }
}
