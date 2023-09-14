import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  getHome(): string {
    return 'Wrong usage of the endpoint access http://localhost:5000/users for our users database';
  }
}
