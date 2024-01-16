import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { AccessTokenGuard } from 'src/common/guards/access-token.guard';
import { UserId } from 'src/common/decorators/user-id.decorator';
import { UserDto } from './dtos/user.dto';

@Controller('users')
@UseGuards(AccessTokenGuard)
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('current')
  async getCurrentUser(@UserId() userId: string) {
    const user = await this.usersService.findById(userId);
    return new UserDto(user);
  }

  @Get('search/:login')
  async getAvailableUsers(@Param('login') login: string) {
    const users = await this.usersService.searchUsers(login);
    return users;
  }

  @Get('workspace')
  async getCurrentWorkspace(@UserId() userId: string) {
    return await this.usersService.getCurrentWorkspace(userId);
  }

  @Put(':workspaceId')
  @HttpCode(HttpStatus.OK)
  async setWorkspace(
    @Param('workspaceId') workspaceId: string,
    @UserId() userId: string,
  ) {
    await this.usersService.setWorkspace(userId, workspaceId);
  }
}
