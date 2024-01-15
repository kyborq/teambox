import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { User } from 'src/users/schemas/user.schema';
import { Workspace } from 'src/workspaces/schema/workspace.schema';

export type MemberDocument = Member & Document;

@Schema()
export class Member {
  @Prop({ required: true, type: Types.ObjectId, ref: 'User' })
  user: User;

  @Prop({ required: true, type: Types.ObjectId, ref: 'Workspace' })
  workspace: Workspace;

  // TODO:
  // @Prop()
  // role?: string;
}

export const MemberSchema = SchemaFactory.createForClass(Member);
