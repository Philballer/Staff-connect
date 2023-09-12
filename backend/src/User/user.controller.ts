import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Delete,
  Logger,
  Query,
} from '@nestjs/common';
import { UserService } from './service/user.service';
import { User } from './schemas/user.schema';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
import { deleteMessage } from './helper/user.helpers';
import { Query as ExpressQuery } from 'express-serve-static-core';
import {
  PaginationResult,
  defaultPaginationOptions,
} from './pagination/pagination';

@Controller('users')
export class UserController {
  private readonly logger = new Logger(UserController.name);
  constructor(private userService: UserService) {}

  @Get()
  async getAllUsers(
    @Query() query: ExpressQuery,
  ): Promise<PaginationResult<User>> {
    return await this.userService.getAll(query, defaultPaginationOptions);
  }

  @Get(':id')
  async getOneUser(@Param('id') id: string): Promise<User> {
    return await this.userService.getOne(id);
  }

  @Post()
  async createUser(@Body() user: CreateUserDto): Promise<User> {
    return this.userService.create(user);
  }

  @Put(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() user: UpdateUserDto,
  ): Promise<User> {
    return this.userService.updateById(id, user);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string): Promise<deleteMessage> {
    return await this.userService.deleteById(id);
  }
}
