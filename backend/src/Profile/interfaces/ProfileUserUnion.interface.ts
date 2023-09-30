import { User } from 'src/User/schemas/user.schema';

import { UpdateProfileDto } from '../dto/profile.dto';

export interface IProfileUserUnion {
  profile: Partial<UpdateProfileDto>;
  user: Partial<User>;
}
