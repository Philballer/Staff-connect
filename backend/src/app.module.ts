import { Module } from '@nestjs/common';
import { AppController } from './app.controller';

import { UserModule } from './User/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';
import { ProfileModule } from './Profile/profile.module';
import { AuthModule } from './Auth/auth.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.DB_AUTH),
    MulterModule.register({ dest: './uploads' }),
    UserModule,
    ProfileModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}

//hello
