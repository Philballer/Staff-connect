import {
  Injectable,
  NotFoundException,
  Logger,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../schemas/user.schema';
import * as mongoose from 'mongoose';
import { CreateUserDto, UpdateUserDto } from '../dto/user.dto';
import { deleteMessage } from '../helper/user.helpers';
import { Query as ExpressQuery } from 'express-serve-static-core';
import { PaginateOptions, PaginationResult } from '../pagination/pagination';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  public constructor(
    @InjectModel(User.name)
    private userModel: mongoose.Model<User>,
  ) {}

  public async getAll(
    query: ExpressQuery,
    pagination: PaginateOptions,
  ): Promise<PaginationResult<User>> {
    pagination.currentPage = Number(query.page) || 1;

    const skip = pagination.limit * (pagination.currentPage - 1);

    const keyword = query.keyword
      ? {
          $or: [
            {
              firstName: {
                $regex: query.keyword,
                $options: 'i',
              },
            },
            {
              lastName: {
                $regex: query.keyword,
                $options: 'i',
              },
            },
            {
              email: {
                $regex: query.keyword,
                $options: 'i',
              },
            },
            {
              username: {
                $regex: query.keyword,
                $options: 'i',
              },
            },
          ],
        }
      : {};
    const users = await this.userModel
      .find({ ...keyword })
      .limit(pagination.limit)
      .skip(skip)
      .populate('profile');

    const count = await this.userModel.countDocuments({ ...keyword });

    return {
      limit: pagination.limit,
      found: users.length,
      page: pagination.currentPage,
      total: pagination.total ? count : null,
      data: users,
    };
  }

  public async getOne(id: string): Promise<User> {
    const user = await this.userModel.findById(id);
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  public async create(user: CreateUserDto): Promise<User> {
    const userData: CreateUserDto = {
      ...user,
      isAdmin: user.isAdmin ? user.isAdmin : false,
    };
    const isValidUser = this.isValidCreateUserDto(user);
    if (!isValidUser) throw new BadRequestException('Invalid user data');
    try {
      return await this.userModel.create(userData);
    } catch (error) {
      const newError = {
        message: 'Duplicate key Error',
        details: { ...error },
      };

      throw new BadRequestException(newError);
    }
  }

  public async updateById(
    id: string,
    userData: Partial<UpdateUserDto>,
  ): Promise<User> {
    const queryOptions = {
      new: true,
      runValidators: true,
    };

    const user = await this.userModel.findById(id);
    if (!user) throw new NotFoundException('User not found');

    return this.userModel.findByIdAndUpdate(id, userData, queryOptions);
  }

  public async addFriendById(
    command: string,
    id: string,
    friendsId: string,
  ): Promise<User> {
    const queryOptions = {
      new: true,
      runValidators: true,
    };

    const user = await this.userModel.findById(id);
    if (!user) throw new NotFoundException('User not found');

    switch (command) {
      case 'add':
        user.friends.push(friendsId);
        break;

      case 'delete': {
        if (!user.friends.includes(friendsId)) {
          throw new NotFoundException('Friend not found');
        }
        user.friends = user.friends.filter((x) => x !== friendsId);
        break;
      }
    }

    return this.userModel.findByIdAndUpdate(id, user, queryOptions);
  }

  public async deleteById(id: string): Promise<deleteMessage> {
    const user = await this.userModel.findById(id);
    if (!user) throw new NotFoundException('User not found');
    await this.userModel.findByIdAndDelete(id);
    return {
      userId: id,
      message: 'User has been deleted Successfully',
    };
  }

  private isValidCreateUserDto(user: CreateUserDto): boolean {
    return (
      typeof user.firstName === 'string' &&
      typeof user.lastName === 'string' &&
      typeof user.address === 'string' &&
      typeof user.gender === 'string' &&
      typeof user.nationality === 'string' &&
      typeof user.birthday === 'string'
    );
  }
}
