import { Module } from '@nestjs/common';
import { AppController } from './app.controller';

import { UserModule } from './User/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.DB_AUTH),
    UserModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
