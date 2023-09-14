import { Injectable } from '@angular/core';
import {
  IDeleteResponse,
  IResponse,
  UserService,
} from '../services/user.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  LoadUsersError,
  LoadUsersSuccess,
  UserActionEnums,
  DeleteUser,
  DeleteUserSuccess,
  DeleteUSerError,
  CreateUser,
  CreateUserSuccess,
  CreateUserFail,
  SearchUserSuccess,
  SearchUserError,
  LoadUsers,
} from './actions';
import { catchError, map, switchMap, of, concatMap } from 'rxjs';
import { ToasterService } from 'src/app/shared-components/shared-services/toaster-service/toaster.services';
import { HttpErrorResponse } from '@angular/common/http';
import { IUser } from '../interfaces/user.interface';
import { SearchUser } from './actions';

@Injectable()
export class UserEffects {
  constructor(
    private userService: UserService,
    private actions$: Actions,
    private toaster: ToasterService
  ) {}

  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActionEnums.LOAD_USERS),
      switchMap((action: LoadUsers) =>
        this.userService.getAllUsers(action.pageNumber).pipe(
          map(
            (response: IResponse) =>
              new LoadUsersSuccess(
                response.data,
                response.total,
                response.found,
                response.limit
              )
          ),
          catchError((error: HttpErrorResponse) => {
            this.toaster.toast(
              'error',
              `${error.message}`,
              'Failed to load users'
            );
            return of(new LoadUsersError(error.message));
          })
        )
      )
    )
  );

  deleteUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActionEnums.DELETE_USER),
      switchMap((action: DeleteUser) =>
        this.userService.deleteUser(action.payload._id).pipe(
          map((response: IDeleteResponse) => {
            this.toaster.toast(
              'success',
              `user: ${action.payload.firstName} ${action.payload.lastName}`,
              'User deleted successfully'
            );
            return new DeleteUserSuccess(response.userId);
          }),
          catchError((error: HttpErrorResponse) => {
            this.toaster.toast(
              'error',
              `${error.message}`,
              'User cannot be deleted'
            );
            return of(new DeleteUSerError(error.message));
          }),
          concatMap(() => [new LoadUsers()]) // loads New users right after delete, array helps with sequence
        )
      )
    )
  );

  createUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActionEnums.CREATE_USER),
      switchMap((action: CreateUser) =>
        this.userService.createUser(action.payload).pipe(
          map((response: IUser) => {
            this.toaster.toast('success', '', 'User creation Successful');
            return new CreateUserSuccess(response);
          }),
          catchError((error: HttpErrorResponse) => {
            this.toaster.toast(
              'error',
              `${error.error.message}`,
              'User cannot be created'
            );
            return of(new CreateUserFail(error.error.message));
          })
        )
      )
    )
  );

  searchUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActionEnums.SEARCH_USER),
      switchMap((action: SearchUser) =>
        this.userService.searchUser(action.payload).pipe(
          map(
            (response: IResponse) =>
              new SearchUserSuccess(
                response.data,
                response.total,
                response.found,
                response.limit
              )
          ),
          catchError((error: HttpErrorResponse) => {
            this.toaster.toast(
              'error',
              `${error.error.message}`,
              'Error While Searching'
            );
            return of(new SearchUserError(error.error.message));
          })
        )
      )
    )
  );
}
