import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Profile } from 'src/Profile/schemas/profile.schema';
import * as bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { NotFoundError } from 'rxjs';
import { UserCredentials } from './interfaces/userCredentials';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Profile.name)
    private profileModel: mongoose.Model<Profile>,
    private readonly jwtService: JwtService,
  ) {}

  public async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 12);
  }

  public async profileLogin(credentials: UserCredentials): Promise<object> {
    console.log(credentials);

    const profile = await this.validateUser(
      credentials.username,
      credentials.password,
    );
    if (profile) {
      return {
        access_token: await this.generateJwtToken(profile),
      };
    }
  }

  private async validateUser(
    email: string,
    password: string,
  ): Promise<Profile> {
    const profile = await this.findByEmailOrUsername(email);

    const passwordMatch = await this.comparePasswords(
      password,
      profile.password,
    );
    if (!passwordMatch) throw new UnauthorizedException('Invalid Password');

    delete profile.password;

    return profile;
  }

  private async generateJwtToken(profile: Profile): Promise<string> {
    return await this.jwtService.signAsync({ profile });
  }

  private async comparePasswords(
    newPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(newPassword, hashedPassword);
  }

  private async findByEmailOrUsername(email: string): Promise<Profile> {
    const searchQuery = {
      $or: [{ email: email }, { username: email }],
    };

    const profile = (await this.profileModel.findOne(searchQuery)).toObject();
    if (!profile) throw new UnauthorizedException('Invalid Username');
    return profile;
  }
}
