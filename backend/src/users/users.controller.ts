import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
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
  @HttpCode(HttpStatus.OK)
  async getCurrentUser(@UserId() userId: string) {
    const user = await this.usersService.findById(userId);
    return new UserDto(user);
  }

  @Get(':login')
  @HttpCode(HttpStatus.OK)
  async getUser(@Param('login') login: string) {
    const user = await this.usersService.findByLogin(login);
    return new UserDto(user);
  }
}
