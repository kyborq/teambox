import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';

@Injectable()
export class TokenService {
  private readonly jwtAccessSecret: string;
  private readonly jwtRefreshSecret: string;

  constructor(
    private jwtService: JwtService,
    configService: ConfigService,
  ) {
    this.jwtAccessSecret = configService.get('JWT_ACCESS_SECRET');
    this.jwtRefreshSecret = configService.get('JWT_REFRESH_SECRET');
  }

  async generateTokens(userId: string, login: string) {
    const accessToken = this.jwtService.sign(
      { sub: userId, login },
      { secret: this.jwtAccessSecret, expiresIn: '15m' },
    );

    const refreshToken = this.jwtService.sign(
      { sub: userId, login },
      { secret: this.jwtRefreshSecret, expiresIn: '7d' },
    );

    return { accessToken, refreshToken };
  }

  async verifyRefreshToken(storedToken: string, providedToken: string) {
    const refreshTokenMatches = argon2.verify(storedToken, providedToken);
    if (!refreshTokenMatches) {
      throw new ForbiddenException('Access Denied');
    }
  }
}
