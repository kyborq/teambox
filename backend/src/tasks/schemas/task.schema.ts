import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes, Types } from 'mongoose';
import { Member } from 'src/members/schemas/member.schema';
import { User } from 'src/users/schemas/user.schema';
import { Workspace } from 'src/workspaces/schema/workspace.schema';

export enum TaskStatus {
  TODO = 'todo',
  IN_PROGRESS = 'in_progress',
  REVIEW = 'review',
  COMPLETED = 'completed',
}

export type TaskDocument = Task & Document;

@Schema()
export class Task {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  alias: string;

  @Prop({ required: true, type: SchemaTypes.ObjectId, ref: 'Workspace' })
  workspace: Workspace;

  @Prop({ required: true, type: SchemaTypes.ObjectId, ref: 'User' })
  author: User;

  @Prop()
  description?: string;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'Member' })
  member?: Member;

  @Prop({
    type: String,
    enum: Object.values(TaskStatus),
    default: TaskStatus.TODO,
  })
  status: TaskStatus;

  @Prop({ type: Date })
  startDate?: Date;

  @Prop({ type: Date })
  endDate?: Date;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
