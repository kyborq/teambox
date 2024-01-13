import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';

import { CreateRoleDto } from './dtos/create-role.dto';
import { RolesService } from './roles.service';

@Controller('roles')
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
  createRole(@Body() createRoleDto: CreateRoleDto) {
    return this.rolesService.createRole(createRoleDto);
  }

  @Delete(':name')
  deleteRole(@Param('name') name: string) {
    return this.rolesService.deleteRoleByName(name);
  }
}
