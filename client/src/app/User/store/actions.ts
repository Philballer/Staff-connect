import { Action } from '@ngrx/store';
import { IUser } from '../interfaces/user.interface';

export enum UserActionEnums {
  LOAD_USERS = '[Users] Load Users',
  LOAD_USERS_SUCCESS = '[Users] Load User Success',
  LOAD_USERS_FAIL = '[Users] Load Users Fail',
  DELETE_USER = '[Users] Delete User',
  DELETE_USER_SUCCESS = '[Users] Delete User Success',
  DELETE_USER_FAIL = '[Users] Delete User Fail',
  CREATE_USER = '[Users] Create User',
  CREATE_USER_SUCCESS = '[Users] Create User Success',
  CREATE_USER_FAIL = '[Users] Create User Fail',
}

export class LoadUsers implements Action {
  readonly type = UserActionEnums.LOAD_USERS;
}

export class LoadUsersSuccess implements Action {
  readonly type = UserActionEnums.LOAD_USERS_SUCCESS;
  constructor(public payload: IUser[]) {}
}

export class LoadUsersError implements Action {
  readonly type = UserActionEnums.LOAD_USERS_FAIL;
  constructor(public payload: string) {}
}
export class DeleteUser implements Action {
  readonly type = UserActionEnums.DELETE_USER;
  constructor(public payload: IUser) {}
}

export class DeleteUserSuccess implements Action {
  readonly type = UserActionEnums.DELETE_USER_SUCCESS;
  constructor(public payload: string) {}
}

export class DeleteUSerError implements Action {
  readonly type = UserActionEnums.DELETE_USER_FAIL;
  constructor(public payload: string) {}
}
export class CreateUser implements Action {
  readonly type = UserActionEnums.CREATE_USER;
  constructor(public payload: IUser) {}
}

export class CreateUserSuccess implements Action {
  readonly type = UserActionEnums.CREATE_USER_SUCCESS;
  constructor(public payload: IUser) {}
}

export class CreateUserFail implements Action {
  readonly type = UserActionEnums.CREATE_USER_FAIL;
  constructor(public payload: string) {}
}

export type UserActions =
  | LoadUsers
  | LoadUsersSuccess
  | LoadUsersError
  | DeleteUser
  | DeleteUSerError
  | DeleteUserSuccess
  | CreateUser
  | CreateUserSuccess
  | CreateUserFail;
