import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Role, RoleDocument } from './schemas/role.schema';
import { CreateRoleDto } from './dtos/create-role.dto';

@Injectable()
export class RolesService {
  constructor(@InjectModel(Role.name) private roleModel: Model<RoleDocument>) {}

  async createRole(createRoleDto: CreateRoleDto) {
    return new this.roleModel(createRoleDto).save();
  }

  async getAllRoles(): Promise<Role[]> {
    return await this.roleModel.find().exec();
  }

  async getRoleByName(name: string) {
    return await this.roleModel.findOne({ name }).exec();
  }

  async deleteRoleByName(name: string) {
    return await this.roleModel.findOneAndDelete({ name }).exec();
  }
}
