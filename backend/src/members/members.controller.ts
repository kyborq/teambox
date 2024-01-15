import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { MembersService } from './members.service';
import { InviteDto } from './dtos/invite.dto';
import { AccessTokenGuard } from 'src/common/guards/access-token.guard';

@Controller('members')
@UseGuards(AccessTokenGuard)
export class MembersController {
  constructor(private membersService: MembersService) {}

  @Post('invite')
  inviteMember(@Body() inviteDto: InviteDto) {
    return this.membersService.inviteMember(inviteDto);
  }

  @Get('invite/:login')
  searchForMembers() {}
}
