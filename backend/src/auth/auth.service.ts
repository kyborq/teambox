import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import * as argon2 from 'argon2';
import { UsersService } from 'src/users/users.service';
import { LoginDto } from './dtos/login.dto';
import { RegisterDto } from './dtos/register.dto';
import { TokenService } from './token.service';
import { WorkspacesService } from 'src/workspaces/workspaces.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private tokenService: TokenService,
    private workspacesService: WorkspacesService,
  ) {}

  async registerUser(credentials: RegisterDto) {
    const user = await this.usersService.findByLogin(credentials.login);
    if (user) {
      throw new BadRequestException('User already exist');
    }

    const hashedPassword = await argon2.hash(credentials.password);

    const createdUser = await this.usersService.createUser({
      ...credentials,
      password: hashedPassword,
    });

    const newWorkspace = await this.workspacesService.createPersonalWorkspace(
      createdUser.id,
      { name: `Пространство ${createdUser.login}` },
    );
    await this.updateWorkspace(createdUser.id, newWorkspace.id);

    return this.issueTokens(createdUser.id, createdUser.login);
  }

  async loginUser(credentials: LoginDto) {
    const user = await this.usersService.findByLogin(credentials.login);
    if (!user) {
      throw new BadRequestException('User does not exist');
    }

    const passwordsMatching = await argon2.verify(
      user.password,
      credentials.password,
    );
    if (!passwordsMatching) {
      throw new BadRequestException('Password or login are incorrect');
    }

    return this.issueTokens(user.id, user.login);
  }

  async refreshTokens(userId: string, refreshToken: string) {
    const user = await this.getValidUserForRefreshToken(userId);

    await this.tokenService.verifyRefreshToken(user.token, refreshToken);

    return this.issueTokens(user.id, user.login);
  }

  async logoutUser(id: string) {
    await this.usersService.setRefreshToken(id, null);
  }

  private async getValidUserForRefreshToken(userId: string) {
    const user = await this.usersService.findById(userId);
    if (!user || !user.token) {
      throw new ForbiddenException('Access Denied');
    }
    return user;
  }

  private async issueTokens(userId: string, login: string) {
    const tokens = await this.tokenService.generateTokens(userId, login);
    await this.updateRefreshToken(userId, tokens.refreshToken);
    return tokens;
  }

  private async updateRefreshToken(userId: string, refreshToken: string) {
    const hashedRefreshToken = await argon2.hash(refreshToken);
    await this.usersService.setRefreshToken(userId, hashedRefreshToken);
  }

  private async updateWorkspace(userId: string, workspaceId: string) {
    await this.usersService.setCurrentWorkspace(userId, workspaceId);
  }
}
