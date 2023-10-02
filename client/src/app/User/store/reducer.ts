import { IUser } from '../interfaces/user.interface';
import { UserActionEnums, UserActions, GetOneUserSuccess } from './actions';

export interface UserState {
  loading: boolean;
  data: IUser[];
  error?: string;
  activeUserProfilePage?: IUser | null;
  userCountFromQuery?: number;
  userPaginated?: boolean; //stops the pagination component from being invisible
  totalFromQuery?: number; //total entries including paginated entries
  foundFromQuery?;
  pageLimit?: number;
}

const initialState: UserState = {
  data: [],
  loading: false,
  userPaginated: false,
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
        data: action.data,
        userPaginated: true,
        pageLimit: action.limit,
        totalFromQuery: action.total,
        foundFromQuery: action.queryFound,
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
    case UserActionEnums.SEARCH_USER: {
      return {
        ...state,
        loading: true,
      };
    }
    case UserActionEnums.SEARCH_USER_SUCCESS: {
      return {
        loading: false,
        data: action.payload,
        pageLimit: action.limit,
        totalFromQuery: action.total,
        foundFromQuery: action.queryFound,
        userPaginated: false,
      };
    }
    case UserActionEnums.SEARCH_USER_FAIL: {
      return {
        ...state,
        loading: false,
        error: action.payload,
        userPaginated: false,
      };
    }
    case UserActionEnums.GET_ONE_USER: {
      return {
        ...state,
        loading: true,
      };
    }
    case UserActionEnums.GET_ONE_USER_SUCCESS: {
      return {
        ...state,
        loading: false,
        activeUserProfilePage: action.payload,
      };
    }
    case UserActionEnums.GET_ONE_USER_FAIL: {
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
