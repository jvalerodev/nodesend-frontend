import { LOADING, SUCCESSFUL_SIGN_UP, SIGN_UP_ERROR, SUCCESSFUL_LOGIN, LOGIN_ERROR, SIGN_OUT, HIDE_ALERT } from '../../types';

export default (state, action) => {
  switch (action.type) {
    case LOADING:
      return {
        ...state,
        loading: true,
      };

    case SUCCESSFUL_SIGN_UP:
    case SIGN_UP_ERROR:
    case LOGIN_ERROR:
      return {
        ...state,
        message: action.payload,
        loading: false
      };

    case SUCCESSFUL_LOGIN:
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        loading: false
      };

    case SIGN_OUT:
      return {
        ...state,
        user: null,
        isAuthenticated: false
      };

    case HIDE_ALERT:
      return {
        ...state,
        message: null
      };

    default:
      return state;
  }
};