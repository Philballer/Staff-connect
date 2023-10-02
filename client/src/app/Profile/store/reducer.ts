import { createReducer, on } from '@ngrx/store';
import { IProfile, IUserCountry } from '../../User/interfaces/user.interface';
import {
  LoadProfile,
  LoadProfileSuccess,
  LoadProfileError,
  LoadUSerCountry,
  LoadUserCountrySuccess,
  LoadUserCountryError,
} from './actions';

const initialState: ProfileState = {
  profile: null,
  countryDetails: null,
  loading: false,
  error: null,
};

export interface ProfileState {
  profile: IProfile | null;
  countryDetails: IUserCountry | null;
  loading: boolean;
  error?: any;
}

export const profileReducer = createReducer(
  initialState,
  on(LoadProfile, (state) => ({ ...state, loading: true })),
  on(LoadProfileSuccess, (state, { payload }) => ({
    ...state,
    loading: false,
    profile: payload,
  })),
  on(LoadProfileError, (state, { error }) => ({
    ...state,
    loading: false,
    error: error,
  })),
  on(LoadUSerCountry, (state) => ({
    ...state,
    loading: true,
  })),
  on(LoadUserCountrySuccess, (state, { payload }) => ({
    ...state,
    loading: false,
    countryDetails: payload,
  })),
  on(LoadUserCountryError, (state, { error }) => ({
    ...state,
    loading: false,
    error: error,
  }))
);
