import { IUser } from '../interfaces/user.interface';
import { UserActionEnums, UserActions } from './actions';

export interface UserState {
  loading: boolean;
  data: IUser[];
  error?: string;
}

const initialState: UserState = {
  loading: false,
  data: [],
};

export function reducer(state = initialState, action: UserActions): UserState {
  switch (action.type) {
    case UserActionEnums.LOAD_USERS: {
      return {
        ...state,
        loading: true,
      };
    }

    case UserActionEnums.LOAD_USERS_SUCCESS: {
      return {
        loading: false,
        data: action.payload,
      };
    }

    case UserActionEnums.LOAD_USERS_FAIL: {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    }
    case UserActionEnums.DELETE_USER: {
      return {
        ...state,
        loading: true,
      };
    }
    case UserActionEnums.DELETE_USER_SUCCESS: {
      return {
        loading: false,
        data: state.data.filter((user) => user._id != action.payload),
      };
    }

    case UserActionEnums.DELETE_USER_FAIL: {
      console.log('from reducer error', action.payload);

      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    }
    case UserActionEnums.CREATE_USER: {
      return {
        ...state,
        loading: true,
      };
    }
    case UserActionEnums.CREATE_USER_SUCCESS: {
      return {
        loading: false,
        data: [...state.data, action.payload],
      };
    }

    case UserActionEnums.CREATE_USER_FAIL: {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    }

    default: {
      return state;
    }
  }
}
