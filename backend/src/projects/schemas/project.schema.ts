import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from 'src/users/schemas/user.schema';

export type ProjectDocument = Project & Document;

@Schema()
export class Project extends Document {
  @Prop({ required: true })
  name: string;

  @Prop()
  owner: User;

  @Prop({ type: [Types.ObjectId], ref: 'Role' })
  team: User[];
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
