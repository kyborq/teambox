import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

import { Workspace } from 'src/workspaces/schema/workspace.schema';

export type UserDocument = User & Document;

@Schema({ versionKey: false })
export class User extends Document {
  @Prop({ required: true })
  login: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  name: string;

  @Prop({ type: Types.ObjectId, ref: 'Workspace' })
  workspace?: Workspace;

  @Prop({ required: true, default: 1 })
  workspacesLimit: number;

  @Prop()
  token?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
