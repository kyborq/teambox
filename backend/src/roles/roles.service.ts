import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Role, RoleDocument } from './schemas/role.schema';
import { CreateRoleDto } from './dtos/create-role.dto';
import { DeleteRoleDto } from './dtos/delete-role.dto';

@Injectable()
export class RolesService {
  constructor(@InjectModel(Role.name) private roleModel: Model<RoleDocument>) {}

  async createRole(workspace: string, createRoleDto: CreateRoleDto) {
    return new this.roleModel({ ...createRoleDto, workspace }).save();
  }

  async getRoles(workspace: string): Promise<Role[]> {
    return await this.roleModel.find({ workspace }).exec();
  }

  async deleteRole(workspace: string, deleteRoleDto: DeleteRoleDto) {
    return await this.roleModel
      .findOneAndDelete({
        id: deleteRoleDto.id,
        workspace: workspace,
      })
      .exec();
  }
}
