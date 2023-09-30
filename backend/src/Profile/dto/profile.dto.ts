import mongoose from 'mongoose';

export class CreateProfileDto {
  readonly username: string;
  readonly email: string;
  readonly password: string;
  readonly bio: string;
  readonly jobTitle: string;
}
export class UpdateProfileDto {
  readonly username?: string;
  readonly email?: string;
  readonly password?: string;
  readonly bio?: string;
  readonly jobTitle?: string;
  readonly userID?: mongoose.Schema.Types.ObjectId;
}
