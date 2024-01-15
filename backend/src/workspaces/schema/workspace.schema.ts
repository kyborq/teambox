import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from 'src/users/schemas/user.schema';

export type WorkspaceDocument = Workspace & Document;

@Schema()
export class Workspace extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  owner: User;

  @Prop()
  isPersonal?: boolean;
}

export const WorkspaceSchema = SchemaFactory.createForClass(Workspace);
