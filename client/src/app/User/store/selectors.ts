import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserState } from './reducer';

const userState = createFeatureSelector('users');

export const selectActiveProfileUserDetails = createSelector(
  userState,
  (state: UserState) => state.activeUserProfilePage
);
export const selectUserLoading = createSelector(
  userState,
  (state: UserState) => state.loading
);
