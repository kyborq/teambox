import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';

import { Role, RoleSchema } from './schemas/role.schema';
import { RolesController } from './roles.controller';
import { RolesService } from './roles.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Role.name, schema: RoleSchema }]),
  ],
  providers: [RolesService],
  controllers: [RolesController],
})
export class RolesModule {}