import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { ImageFile } from '../helper/user.helpers';

@Schema({
  timestamps: true,
})
export class User {
  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ unique: true })
  email: string;

  @Prop()
  address: string;

  @Prop()
  gender: string;

  @Prop()
  nationality: string;

  @Prop()
  birthday: Date;

  @Prop({ type: ImageFile })
  avatar: ImageFile;

  @Prop()
  isAdmin: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
