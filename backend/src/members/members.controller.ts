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
import { WorkspaceMemberInterceptor } from 'src/common/interceptors/workspace-member.interceptor';
import { WorkspaceOwnerGuard } from 'src/common/guards/workspace-owner.guard';
import { UserDto } from 'src/users/dtos/user.dto';

@Controller('members')
@UseGuards(AccessTokenGuard)
export class MembersController {
  constructor(private membersService: MembersService) {}

  @Get(':workspace')
  @UseInterceptors(WorkspaceMemberInterceptor)
  async getWorkspaceMembers(@Param('workspace') workspace: string) {
    const members = await this.membersService.findMembers(workspace);
    return members.map((user) => new UserDto(user));
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
