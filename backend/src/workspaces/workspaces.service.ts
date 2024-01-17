import {
  BadRequestException,
  ForbiddenException,
  Inject,
  Injectable,
  forwardRef,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Workspace, WorkspaceDocument } from './schema/workspace.schema';
import { Model } from 'mongoose';
import { CreateWorkSpaceDto } from './dtos/create-workspace.dto';
import { UsersService } from 'src/users/users.service';
import { MembersService } from 'src/members/members.service';

@Injectable()
export class WorkspacesService {
  constructor(
    @InjectModel(Workspace.name)
    private workspaceModel: Model<WorkspaceDocument>,
    private usersService: UsersService,
    @Inject(forwardRef(() => MembersService))
    private membersService: MembersService,
  ) {}

  async createWorkspace(
    userId: string,
    createWorkspaceDto: CreateWorkSpaceDto,
  ): Promise<Workspace> {
    const existingWorkspace = await this.workspaceModel
      .findOne({
        name: createWorkspaceDto.name,
        owner: userId,
      })
      .exec();

    if (existingWorkspace) {
      throw new BadRequestException(
        'A workspace with this name already exists for this user',
      );
    }

    return new this.workspaceModel({
      ...createWorkspaceDto,
      owner: userId,
    }).save();
  }

  async createPersonalWorkspace(
    userId: string,
    createWorkspaceDto: CreateWorkSpaceDto,
  ): Promise<Workspace> {
    return new this.workspaceModel({
      ...createWorkspaceDto,
      isPersonal: true,
      owner: userId,
    }).save();
  }

  async setUserWorkspace(userId: string, workspace: string) {
    return await this.usersService.setCurrentWorkspace(userId, workspace);
  }

  async getUserWithLogin(login: string) {
    return await this.usersService.findByLogin(login);
  }

  async getWorkspaces(userId: string): Promise<Workspace[]> {
    const ownedWorkspaces = await this.getUserWorkspaces(userId);
    const memberWorkspaces = await this.membersService.findWorkspaces(userId);
    return [...ownedWorkspaces, ...memberWorkspaces];
  }

  async getUserWorkspaces(userId: string): Promise<Workspace[]> {
    return this.workspaceModel.find({ owner: userId }).exec();
  }

  async getWorkspaceById(id: string, userId: string): Promise<Workspace> {
    const workspace = await this.workspaceModel.findOne({ _id: id }).exec();

    const isOwner = workspace.owner.toString() === userId;
    const isMember = await this.membersService.isMemberOfWorkspace(
      userId,
      workspace.id,
    );

    if (!(isOwner || isMember)) {
      throw new ForbiddenException(
        'Access denied: User is not a member or an owner of the workspace.',
      );
    }

    return workspace;
  }

  async getWorkspace(workspaceId: string): Promise<Workspace> {
    return await this.workspaceModel.findOne({ _id: workspaceId }).exec();
  }

  async canCreateWorkspace(id: string): Promise<boolean> {
    const user = await this.usersService.findById(id);

    if (!user || user.workspacesLimit == null) {
      throw new BadRequestException(
        'User not found or workspacesLimit is not set.',
      );
    }

    const workspaceCount = await this.workspaceModel
      .countDocuments({
        owner: id,
        isPersonal: { $ne: true },
      })
      .exec();

    return workspaceCount < user.workspacesLimit;
  }

  async deleteWorkspace(workspaceId: string, userId: string): Promise<void> {
    const workspace = await this.workspaceModel
      .findOne({
        _id: workspaceId,
        owner: userId,
      })
      .exec();

    if (!workspace) {
      throw new BadRequestException(
        'Workspace not found or you do not have permission to delete this workspace.',
      );
    }

    if (workspace.isPersonal) {
      throw new BadRequestException('Personal workspaces cannot be deleted.');
    }

    await this.workspaceModel.deleteOne({ _id: workspaceId }).exec();
  }

  async renameWorkspace(
    workspaceId: string,
    userId: string,
    newName: string,
  ): Promise<Workspace> {
    const workspace = await this.workspaceModel
      .findOneAndUpdate(
        { _id: workspaceId, owner: userId },
        { name: newName },
        { new: true },
      )
      .exec();

    if (!workspace) {
      throw new BadRequestException(
        'Workspace not found or you do not have permission to rename this workspace.',
      );
    }

    return workspace;
  }

  async getWorkspaceIfMemberOrOwner(
    workspaceId: string,
    userId: string,
  ): Promise<Workspace> {
    const workspace = await this.workspaceModel
      .findOne({ _id: workspaceId })
      .exec();

    if (!workspace) {
      throw new BadRequestException('Workspace not found.');
    }

    const isMemberOrOwner = workspace.owner.toString() === userId;

    if (isMemberOrOwner) {
      return workspace;
    } else {
      throw new BadRequestException(
        'Access denied: User is not a member or an owner of the workspace.',
      );
    }
  }
}
