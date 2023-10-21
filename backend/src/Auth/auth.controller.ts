import { Body, Controller, Post } from '@nestjs/common';
import { UserCredentials } from './interfaces/userCredentials';
import { AuthService } from './auth.service';
import { Profile } from 'src/Profile/schemas/profile.schema';

@Controller('api/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() userCredentials: UserCredentials): Promise<object> {
    return await this.authService.profileLogin(userCredentials);
  }
}
