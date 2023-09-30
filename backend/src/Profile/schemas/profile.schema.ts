import mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from 'src/User/schemas/user.schema';

@Schema({
  timestamps: true,
})
export class Profile {
  @Prop({ required: true, unique: true, minlength: 4 })
  username: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop()
  bio: string;

  @Prop()
  jobTitle: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  userID: User;
}

export const ProfileSchema = SchemaFactory.createForClass(Profile);
