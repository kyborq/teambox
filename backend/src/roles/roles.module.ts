import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';

import { Role, RoleSchema } from './schemas/role.schema';
import { RolesController } from './roles.controller';
import { RolesService } from './roles.service';
import { WorkspacesModule } from 'src/workspaces/workspaces.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Role.name, schema: RoleSchema }]),
    WorkspacesModule,
    UsersModule,
  ],
  providers: [RolesService],
  controllers: [RolesController],
})
export class RolesModule {}
