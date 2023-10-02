import { Injectable } from '@angular/core';
import { ProfileService } from '../services/profile.services';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  LoadProfile,
  LoadProfileError,
  LoadProfileSuccess,
  LoadUSerCountry,
  LoadUserCountryError,
  LoadUserCountrySuccess,
} from './actions';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { IProfile, IUserCountry } from 'src/app/User/interfaces/user.interface';
import { ToasterService } from 'src/app/shared-components/shared-services/toaster-service/toaster.services';

@Injectable()
export class ProfileEffects {
  constructor(
    public profileService: ProfileService,
    public action$: Actions,
    private toaster: ToasterService
  ) {}

  loadProfile$ = createEffect(() =>
    this.action$.pipe(
      ofType(LoadProfile),
      switchMap((action) =>
        this.profileService.getProfile(action.id).pipe(
          map((data: IProfile) => LoadProfileSuccess({ payload: data })),
          catchError((error) => {
            this.toaster.toast(
              'error',
              `${error.error.message}`,
              'User cannot be created'
            );
            return of(LoadProfileError({ error: error }));
          })
        )
      )
    )
  );

  loadUserCountry$ = createEffect(() =>
    this.action$.pipe(
      ofType(LoadUSerCountry),
      switchMap((action) =>
        this.profileService.getUserCountry(action.countryName).pipe(
          map((data: IUserCountry[]) =>
            LoadUserCountrySuccess({ payload: data[0] })
          ),
          catchError((error) => {
            this.toaster.toast(
              'error',
              `${error.error.message}`,
              'User cannot be created'
            );
            return of(LoadUserCountryError({ error: error }));
          })
        )
      )
    )
  );
}
