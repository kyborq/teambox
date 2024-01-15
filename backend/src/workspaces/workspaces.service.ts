import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Workspace, WorkspaceDocument } from './schema/workspace.schema';
import { Model } from 'mongoose';
import { CreateWorkSpaceDto } from './dtos/create-workspace.dto';

@Injectable()
export class WorkspacesService {
  constructor(
    @InjectModel(Workspace.name)
    private workspaceModel: Model<WorkspaceDocument>,
  ) {}

  async createWorkspace(
    userId: string,
    createWorkspaceDto: CreateWorkSpaceDto,
  ) {
    return new this.workspaceModel({
      ...createWorkspaceDto,
      owner: userId,
    }).save();
  }

  async getUserWorkspaces(userId: string): Promise<Workspace[]> {
    return this.workspaceModel.find({ owner: userId }).exec();
  }

  async getWorkspaceById(id: string): Promise<Workspace> {
    return this.workspaceModel.findById(id).exec();
  }
}
