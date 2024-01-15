import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { Workspace } from 'src/workspaces/schema/workspace.schema';

export type RoleDocument = Role & Document;

@Schema()
export class Role {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop({ required: true, type: Types.ObjectId, ref: 'Workspace' })
  workspace: Workspace;

  @Prop()
  label?: string;

  // TODO:
  // @Prop()
  // permissions: Permission[]
}

export const RoleSchema = SchemaFactory.createForClass(Role);
