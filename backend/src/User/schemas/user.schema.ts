import mongoose from 'mongoose';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Profile } from 'src/Profile/schemas/profile.schema';

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true, minlength: 3 })
  firstName: string;

  @Prop({ required: true, minlength: 3 })
  lastName: string;

  @Prop({ required: true })
  address: string;

  @Prop({ required: true })
  nationality: string;

  @Prop({ required: true })
  birthday: Date;

  @Prop()
  avatar: string;

  @Prop()
  gender: string;

  @Prop()
  isAdmin: boolean;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Profile' })
  profile: Profile;
}

export const UserSchema = SchemaFactory.createForClass(User);

// @Prop({ type: ImageFile })
// avatar: ImageFile;
