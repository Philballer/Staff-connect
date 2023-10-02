import { createAction, props } from '@ngrx/store';
import { IProfile, IUserCountry } from 'src/app/User/interfaces/user.interface';

export const LoadProfile = createAction(
  '[Profile] get user profile',
  props<{ id: string }>()
);
export const LoadProfileSuccess = createAction(
  '[Profile] get user profile success',
  props<{ payload: IProfile }>()
);
export const LoadProfileError = createAction(
  '[Profile] get user profile error',
  props<{ error: any }>()
);
export const LoadUSerCountry = createAction(
  '[Profile] get user profile country details',
  props<{ countryName: string }>()
);
export const LoadUserCountrySuccess = createAction(
  '[Profile] get user profile country details success',
  props<{ payload: IUserCountry }>()
);
export const LoadUserCountryError = createAction(
  '[Profile] get user profile country details error',
  props<{ error: any }>()
);

export type ProfileActions =
  | ReturnType<typeof LoadProfile>
  | ReturnType<typeof LoadProfileSuccess>
  | ReturnType<typeof LoadProfileError>
  | ReturnType<typeof LoadUSerCountry>
  | ReturnType<typeof LoadUserCountrySuccess>
  | ReturnType<typeof LoadUserCountryError>;
