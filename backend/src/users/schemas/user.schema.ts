import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Role } from 'src/roles/schemas/role.schema';

export type UserDocument = User & Document;

@Schema()
export class User extends Document {
  @Prop({ required: true })
  login: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  name: string;

  @Prop({ type: Types.ObjectId, ref: 'Role' })
  role?: Role;

  @Prop()
  token?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
