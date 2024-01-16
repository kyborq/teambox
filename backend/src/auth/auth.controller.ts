import {
  Body,
  Controller,
  HttpCode,
  Post,
  HttpStatus,
  UseGuards,
  UseInterceptors,
  Get,
} from '@nestjs/common';
import { AccessTokenGuard } from 'src/common/guards/access-token.guard';
import { RefreshTokenGuard } from 'src/common/guards/refresh-token.guard';
import { SetCookiesInterceptor } from 'src/common/interceptors/set-cookies.interceptor';
import { ClearCookiesInterceptor } from 'src/common/interceptors/clear-cookies.interceptor';

import { AuthService } from './auth.service';
import { LoginDto } from './dtos/login.dto';
import { RegisterDto } from './dtos/register.dto';
import { UserId } from 'src/common/decorators/user-id.decorator';
import { User } from 'src/common/decorators/user.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(SetCookiesInterceptor)
  async login(@Body() credentials: LoginDto) {
    return await this.authService.loginUser(credentials);
  }

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  @UseInterceptors(SetCookiesInterceptor)
  async register(@Body() credentials: RegisterDto) {
    return await this.authService.registerUser(credentials);
  }

  @Get('logout')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AccessTokenGuard)
  @UseInterceptors(ClearCookiesInterceptor)
  async logout(@UserId() userId: string) {
    return this.authService.logoutUser(userId);
  }

  @Get('refresh')
  @HttpCode(HttpStatus.OK)
  @UseGuards(RefreshTokenGuard)
  @UseInterceptors(SetCookiesInterceptor)
  async refresh(
    @UserId() userId: string,
    @User('refreshToken') refreshToken: string,
  ) {
    return await this.authService.refreshTokens(userId, refreshToken);
  }
}
