import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { CreateUserDto } from './dtos/create-user.dto';
import { MembersService } from 'src/members/members.service';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async createUser(createUserDto: CreateUserDto) {
    return new this.userModel(createUserDto).save();
  }

  async findByLogin(login: string): Promise<User> {
    return await this.userModel.findOne({ login }).exec();
  }

  async findById(id: string): Promise<User> {
    return await this.userModel.findById(id).exec();
  }

  async setRefreshToken(id: string, token?: string) {
    return await this.userModel.findByIdAndUpdate(id, { token: token || null });
  }

  async setCurrentWorkspace(id: string, workSpaceId: string) {
    return await this.userModel.findByIdAndUpdate(id, {
      workspace: workSpaceId,
    });
  }
}
