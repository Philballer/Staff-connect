import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { Profile } from './schemas/profile.schema';
import { ProfileService } from './profile.service';
import { CreateProfileDto, UpdateProfileDto } from './dto/profile.dto';
import { IProfileUserUnion } from './interfaces/ProfileUserUnion.interface';
import { deleteMessage } from 'src/User/helper/user.helpers';

@Controller('api/profiles')
export class ProfileController {
  constructor(private profileService: ProfileService) {}

  @Get(':id')
  async getProfile(@Param('id') id: string): Promise<Profile> {
    return await this.profileService.getOne(id);
  }

  @Post()
  async createProfile(@Body() profile: CreateProfileDto): Promise<Profile> {
    return await this.profileService.create(profile);
  }

  @Put('/add-user/:id')
  async addUserToProfile(
    @Param('id') id: string,
    @Body() profileAndUser: IProfileUserUnion,
  ): Promise<Profile> {
    return await this.profileService.updateProfileByIdWithNewUser(
      id,
      profileAndUser,
    );
  }

  @Put(':id')
  async updateProfile(
    @Param('id') id: string,
    @Body() profile: Partial<UpdateProfileDto>,
  ): Promise<Profile> {
    return this.profileService.updateProfile(id, profile);
  }

  @Delete(':id')
  async deleteProfile(@Param('id') id: string): Promise<deleteMessage> {
    return await this.profileService.deleteProfile(id);
  }
}
