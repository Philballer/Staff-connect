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
  SEARCH_USER = '[Users] Search User',
  SEARCH_USER_SUCCESS = '[Users] Search User Success',
  SEARCH_USER_FAIL = '[Users] Search User Fail',
  GET_ONE_USER = '[Users] Get one User',
  GET_ONE_USER_SUCCESS = '[Users] Get one User Success',
  GET_ONE_USER_FAIL = '[Users] Get one User Fail',
}

export class LoadUsers implements Action {
  readonly type = UserActionEnums.LOAD_USERS;
  constructor(public pageNumber: number = 1) {}
}

export class LoadUsersSuccess implements Action {
  readonly type = UserActionEnums.LOAD_USERS_SUCCESS;
  constructor(
    public data: IUser[],
    public total: number,
    public queryFound: number,
    public limit: number
  ) {}
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
export class SearchUser implements Action {
  readonly type = UserActionEnums.SEARCH_USER;
  constructor(public payload: string) {}
}
export class SearchUserSuccess implements Action {
  readonly type = UserActionEnums.SEARCH_USER_SUCCESS;
  constructor(
    public payload: IUser[],
    public total: number,
    public queryFound: number,
    public limit: number
  ) {}
}
export class SearchUserError implements Action {
  readonly type = UserActionEnums.SEARCH_USER_FAIL;
  constructor(public payload: string) {}
}
export class GetOneUser implements Action {
  readonly type = UserActionEnums.GET_ONE_USER;
  constructor(public id: string) {}
}
export class GetOneUserSuccess implements Action {
  readonly type = UserActionEnums.GET_ONE_USER_SUCCESS;
  constructor(public payload: IUser) {}
}
export class GetOneUserError implements Action {
  readonly type = UserActionEnums.GET_ONE_USER_FAIL;
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
  | CreateUserFail
  | SearchUser
  | SearchUserSuccess
  | SearchUserError
  | GetOneUser
  | GetOneUserSuccess
  | GetOneUserError;
