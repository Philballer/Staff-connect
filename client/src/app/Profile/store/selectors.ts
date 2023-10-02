import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProfileState } from './reducer';

const selectProfileState = createFeatureSelector('profile');

export const selectProfileData = createSelector(
  selectProfileState,
  (state: ProfileState) => state.profile
);
export const selectLoading = createSelector(
  selectProfileState,
  (state: ProfileState) => state.loading
);
export const selectCountryDetails = createSelector(
  selectProfileState,
  (state: ProfileState) => state.countryDetails
);
