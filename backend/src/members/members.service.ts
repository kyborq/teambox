import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Member, MemberDocument } from './schemas/member.schema';
import { Model } from 'mongoose';
import { User } from 'src/users/schemas/user.schema';
import { CreateMembersDto } from './dtos/create-members.dto';

@Injectable()
export class MembersService {
  constructor(
    @InjectModel(Member.name) private memberModel: Model<MemberDocument>,
  ) {}

  async createMembers(workspace: string, members: CreateMembersDto) {
    return members.userIds.map((id) => {
      return new this.memberModel({ user: id, workspace }).save();
    });
  }

  async findMembers(workspace: string): Promise<User[]> {
    const members = await this.memberModel.find({ workspace }, 'user').exec();
    return members.map((member) => member.user);
  }
}
