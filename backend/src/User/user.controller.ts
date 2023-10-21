import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Logger,
  Query,
  UseInterceptors,
  UploadedFile,
  Request,
} from '@nestjs/common';
import { UserService } from './service/user.service';
import { User } from './schemas/user.schema';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
import { Query as ExpressQuery } from 'express-serve-static-core';
import {
  PaginationResult,
  defaultPaginationOptions,
} from './pagination/pagination';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { Request as ExpressRequest } from 'express';

@Controller('api/users')
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

  @Post('/upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './avatars',
        filename: (req, file, callback) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const extension = extname(file.originalname);
          const filename = `${uniqueSuffix}${extension}`;
          callback(null, filename);
        },
      }),
    }),
  )
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    console.log('file', file);
    const relativePath = file.path;
    const baseUrl = 'http://localhost:5000/users';
    const completeUrl = new URL(relativePath, baseUrl);
    return completeUrl;
  }

  @Put(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() user: Partial<UpdateUserDto>,
  ): Promise<User> {
    return this.userService.updateById(id, user);
  }

  @Put('add-friend/:id/:friendId')
  async addFriend(
    @Param('id') id: string,
    @Param('friendId') friendId: string,
  ): Promise<User> {
    return this.userService.addFriendById('add', id, friendId);
  }

  @Put('delete-friend/:id/:friendId')
  async deleteFriend(
    @Param('id') id: string,
    @Param('friendId') friendId: string,
  ): Promise<User> {
    return this.userService.addFriendById('delete', id, friendId);
  }

  @Post('test')
  public async doSomething(@Request() request: ExpressRequest): Promise<void> {
    console.log(request.body);
  }

  //* Not more allowed to delete from this endpoint. Delete would take place in the Profile-delete-endpoint

  // @Delete(':id')
  // async deleteUser(@Param('id') id: string): Promise<deleteMessage> {
  //   return await this.userService.deleteById(id);
  // }
}
