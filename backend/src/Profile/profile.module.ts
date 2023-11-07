import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Profile, ProfileSchema } from './schemas/profile.schema';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';
import { UserModule } from 'src/User/user.module';
import { AuthService } from 'src/Auth/auth.service';
import { AuthModule } from 'src/Auth/auth.module';


@Module({
  imports: [
    MongooseModule.forFeature([{ name: Profile.name, schema: ProfileSchema }]),
    UserModule,
 add-authentification
    AuthModule,
  ],
  controllers: [ProfileController],
  providers: [ProfileService, AuthService],
  exports: [MongooseModule],

})
export class ProfileModule {}
