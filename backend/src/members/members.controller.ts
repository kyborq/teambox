import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { MembersService } from './members.service';
import { CreateMembersDto } from './dtos/create-members.dto';
import { AccessTokenGuard } from 'src/common/guards/access-token.guard';
import { WorkspaceOwnerGuard } from 'src/common/guards/workspace-owner.guard';
import { WorkspacePersonalGuard } from 'src/common/guards/workspace-personal.guard';

@Controller('members')
@UseGuards(AccessTokenGuard, WorkspacePersonalGuard)
export class MembersController {
  constructor(private membersService: MembersService) {}

  @Get(':workspace')
  findMembers(@Param('workspace') workspace: string) {
    return this.membersService.findMembers(workspace);
  }

  @Post(':workspace')
  @UseGuards(WorkspaceOwnerGuard)
  createMembers(@Body() membersDto: CreateMembersDto) {
    return this.membersService.createMembers(membersDto);
  }
}
