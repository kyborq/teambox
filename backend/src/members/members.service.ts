import {
  BadRequestException,
  Inject,
  Injectable,
  forwardRef,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Workspace } from 'src/workspaces/schema/workspace.schema';
import { User } from 'src/users/schemas/user.schema';
import { Member, MemberDocument } from './schemas/member.schema';
import { WorkspacesService } from 'src/workspaces/workspaces.service';

@Injectable()
export class MembersService {
  constructor(
    @InjectModel(Member.name)
    private memberModel: Model<MemberDocument>,
    @Inject(forwardRef(() => WorkspacesService))
    private workspaceService: WorkspacesService,
  ) {}

  async createMember(userLogin: string, workspaceId: string): Promise<Member> {
    const workspace = await this.workspaceService.getWorkspace(workspaceId);
    if (!workspace) {
      throw new BadRequestException('Workspace does not exist.');
    }

    const user = await this.workspaceService.getUserWithLogin(userLogin);

    if (workspace.owner.toString() === user.id) {
      throw new BadRequestException(
        'You are owner, no need to add yourself as member.',
      );
    }

    if (workspace.isPersonal) {
      throw new BadRequestException(
        'Cannot add members to a personal workspace.',
      );
    }

    const alreadyExists = await this.isMemberOfWorkspace(user.id, workspaceId);
    if (alreadyExists) {
      throw new BadRequestException(
        'User is already a member of this workspace.',
      );
    }

    const createdMember = new this.memberModel({
      user: user.id,
      workspace: workspaceId,
    });
    return createdMember.save();
  }

  async removeMember(user: string, workspace: string): Promise<Member> {
    return this.memberModel.findOneAndDelete({ user, workspace }).exec();
  }

  async findMembers(workspace: string): Promise<User[]> {
    const members = await this.memberModel
      .find({ workspace }, 'user')
      .populate('user')
      .exec();
    return members.map((member) => member.user);
  }

  async findWorkspaces(user: string): Promise<Workspace[]> {
    const members = await this.memberModel
      .find({ user }, 'workspace')
      .populate('workspace')
      .exec();
    return members.map((member) => member.workspace);
  }

  async isMemberOfWorkspace(
    user: string,
    workspaceId: string,
  ): Promise<boolean> {
    const workspace = await this.workspaceService.getWorkspace(workspaceId);
    if (!workspace) {
      throw new BadRequestException('Workspace does not exist.');
    }

    const member = await this.memberModel
      .findOne({ user, workspace: workspaceId })
      .exec();

    return !!member || workspace.owner.toString() === user;
  }
}
