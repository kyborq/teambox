import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';

import { CreateRoleDto } from './dtos/create-role.dto';
import { RolesService } from './roles.service';
import { AccessTokenGuard } from 'src/common/guards/access-token.guard';
import { WorkspaceOwnerGuard } from 'src/common/guards/workspace-owner.guard';

@Controller('roles')
@UseGuards(AccessTokenGuard)
export class RolesController {
  constructor(private rolesService: RolesService) {}

  @Get()
  getAllRoles() {
    return this.rolesService.getAllRoles();
  }

  @Get(':name')
  getRole(@Param('name') name: string) {
    return this.rolesService.getRoleByName(name);
  }

  @Post()
  @UseGuards(WorkspaceOwnerGuard)
  createRole(@Body() createRoleDto: CreateRoleDto) {
    return this.rolesService.createRole(createRoleDto);
  }

  @Delete(':name')
  @UseGuards(WorkspaceOwnerGuard)
  deleteRole(@Param('name') name: string) {
    return this.rolesService.deleteRoleByName(name);
  }
}
