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
import { DeleteRoleDto } from './dtos/delete-role.dto';

@Controller('roles')
@UseGuards(AccessTokenGuard, WorkspaceOwnerGuard)
export class RolesController {
  constructor(private rolesService: RolesService) {}

  @Get(':workspace')
  getRoles(@Param('workspace') workspace: string) {
    return this.rolesService.getRoles(workspace);
  }

  @Post(':workspace')
  createRole(
    @Param('workspace') workspace: string,
    @Body() createRoleDto: CreateRoleDto,
  ) {
    return this.rolesService.createRole(workspace, createRoleDto);
  }

  @Delete(':workspace')
  deleteRole(
    @Param('workspace') workspace: string,
    @Body() deleteRoleDto: DeleteRoleDto,
  ) {
    return this.rolesService.deleteRole(workspace, deleteRoleDto);
  }
}
