import {
  AUTH_FAIL,
  AUTH_START,
  AUTH_SUCCESS,
  LOGOUT_FAIL,
  LOGOUT_START,
  LOGOUT_SUCCESS,
} from './Auth.actions';

const initialState = {
  isLoading: false,
  isLoggedIn: false,
  user: null,
  error: null,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case AUTH_START:
    case LOGOUT_START:
      return {
        ...state,
        isLoading: true,
      };
    case AUTH_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isLoggedIn: true,
        user: payload,
      };
    case AUTH_FAIL:
      return {
        ...state,
        isLoggedIn: false,
        user: null,
        isLoading: false,
        error: payload,
      };
    case LOGOUT_SUCCESS:
      return {
        ...initialState,
      };
    case LOGOUT_FAIL: {
      return {
        ...state,
        isLoading: false,
        error: payload,
      };
    }
    default:
      return state;
  }
};
