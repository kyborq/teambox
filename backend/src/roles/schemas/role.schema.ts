import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type RoleDocument = Role & Document;

@Schema()
export class Role {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop({ required: true })
  label: string;
}

export const RoleSchema = SchemaFactory.createForClass(Role);
