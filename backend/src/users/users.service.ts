import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { Model } from 'mongoose';
import { CreateUserDto } from './dtos/create-user.dto';
import { MembersService } from 'src/members/members.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private memberService: MembersService,
  ) {}

  async createUser(createUserDto: CreateUserDto) {
    return new this.userModel(createUserDto).save();
  }

  async findByLogin(login: string) {
    return await this.userModel.findOne({ login });
  }

  async findById(id: string) {
    return await this.userModel.findOne({ _id: id });
  }

  async searchByLogin(login: string) {
    return await this.userModel
      .find({
        login: { $regex: login, $options: 'i' },
      })
      .select('login name _id')
      .limit(4);
  }

  async searchAvailabelUsers(
    workspaceId: string,
    login: string,
  ): Promise<User[]> {
    const memberUserIds = await this.memberService.findMembers(workspaceId);

    const availableUsers = await this.userModel
      .find({
        _id: { $nin: memberUserIds },
        login: { $regex: login, $options: 'i' },
      })
      .limit(4)
      .exec();

    return availableUsers;
  }

  async setRefreshToken(id: string, token?: string) {
    return await this.userModel.findOneAndUpdate(
      { _id: id },
      { token: token || null },
    );
  }
}
