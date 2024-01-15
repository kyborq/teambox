import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Member, MemberDocument } from './schemas/member.schema';
import { Model } from 'mongoose';
import { InviteDto } from './dtos/invite.dto';
import { User } from 'src/users/schemas/user.schema';

@Injectable()
export class MembersService {
  constructor(
    @InjectModel(Member.name) private memberModel: Model<MemberDocument>,
  ) {}

  async inviteMember(inviteDto: InviteDto) {
    return new this.memberModel(inviteDto).save();
  }

  async findMembers(workspaceId: string): Promise<User[]> {
    const members = await this.memberModel
      .find({ workspace: workspaceId }, 'user')
      .exec();
    return members.map((member) => member.user);
  }
}
