import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import mongoose from 'mongoose';
import { Profile } from './schemas/profile.schema';
import { InjectModel } from '@nestjs/mongoose';
import { CreateProfileDto, UpdateProfileDto } from './dto/profile.dto';
import { User } from 'src/User/schemas/user.schema';
import { IProfileUserUnion } from './interfaces/ProfileUserUnion.interface';
import { UpdateUserDto } from 'src/User/dto/user.dto';
import { deleteMessage } from 'src/User/helper/user.helpers';
import { AuthService } from 'src/Auth/auth.service';


@Injectable()
export class ProfileService {
  private readonly logger = new Logger(ProfileService.name);

  public constructor(
    @InjectModel(Profile.name)
    private profileModel: mongoose.Model<Profile>,
    @InjectModel(User.name)
    private userModel: mongoose.Model<User>,
    private authService: AuthService,
  ) {}

  public async getOne(id: string): Promise<Profile> {
    const profile = await this.profileModel.findById(id);
    if (!profile) throw new NotFoundException('User not found');
    const newProfile = { ...profile.toObject() };
    delete newProfile.password;
    return newProfile;

    //.populate('userID) if i want to eagerly load
  }

  public async create(profile: CreateProfileDto): Promise<Profile> {
    const isValidProfile = this.isValidCreateProfileDto(profile);
    if (!isValidProfile) throw new BadRequestException('Invalid user data');

    try {
      const newProfile: CreateProfileDto = {
        ...profile,
        password: await this.authService.hashPassword(profile.password),
      };

      const createdProfile = await this.profileModel.create(newProfile);

      const profileWithoutPassword: Profile = { ...createdProfile.toObject() };
      delete profileWithoutPassword.password;

      return profileWithoutPassword;
    } catch (error) {
      const newError = {
        message: 'Duplicate key Error',
        details: { ...error },
      };

      throw new BadRequestException(newError);
    }
  }

  public async updateProfileByIdWithNewUser(
    id: string,
    profileAndUser: IProfileUserUnion,
  ): Promise<Profile> {
    const queryOptions = {
      new: true,
      runValidators: true,
    };

    const profileInDb = await this.profileModel.findById(id);
    if (!profileInDb) throw new NotFoundException('Profile not found');

    const createdUser = await this.userModel.create(profileAndUser.user);

    const profile = profileAndUser.profile;

    const newProfile: UpdateProfileDto = {
      ...profile,
      userID: createdUser.id,
    };

    const savedProfile = await this.profileModel.findByIdAndUpdate(
      id,
      newProfile,
      queryOptions,
    );

    const profileID = profileInDb._id.toString();

    //update the user to reference the profile
    const updatedUser: Partial<UpdateUserDto> = {
      profile: profileID,
    };

    const userID = createdUser._id.toString();

    await this.userModel.findByIdAndUpdate(userID, updatedUser, queryOptions);

    return savedProfile;
  }

  public async updateProfile(id: string, profile: UpdateProfileDto) {
    const profileInDB = await this.getOne(id);
    if (!profileInDB) throw new NotFoundException('Profile not found');
    const data = {
      ...profile,
      userID: profileInDB.userID,
    };
    return this.profileModel.findByIdAndUpdate(id, data);
  }

  public async deleteProfile(id: string): Promise<deleteMessage> {
    const profile = await this.getOne(id);
    if (!profile) throw new NotFoundException('Profile not Found');
    try {
      await this.profileModel.findByIdAndDelete(id);
      await this.userModel.findByIdAndDelete(profile.userID);

    } catch (error) {
      throw new HttpException(`${error}`, HttpStatus.BAD_REQUEST);
    }
    const successMessage: deleteMessage = {
      message: 'Profile has been deleted Successfully',
      profileId: id,
    };
    return successMessage;
  }

  private isValidCreateProfileDto(profile: CreateProfileDto): boolean {
    return (
      typeof profile.username === 'string' &&
      typeof profile.email === 'string' &&
      typeof profile.password === 'string'
    );
  }
}
