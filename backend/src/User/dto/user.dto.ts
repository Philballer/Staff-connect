import { PartialType } from '@nestjs/mapped-types';

export class CreateUserDto {
  readonly firstName: string;
  readonly lastName: string;
  readonly address: string;
  readonly gender: string;
  readonly nationality: string;
  readonly birthday: Date;
  readonly avatar?: File;
  readonly profile?: string;
  readonly isAdmin?: boolean;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
