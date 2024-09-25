import {
  AUTH_LOGIN_ERR,
  AUTH_LOGIN_REQUEST,
  AUTH_LOGIN_SUCCESS,
  AUTH_SIGNUP_ERR,
  AUTH_SIGNUP_REQUEST,
  AUTH_SIGNUP_SUCCESS,
} from "../Constants/AuthConstant";

export const authLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case AUTH_LOGIN_REQUEST:
      return {
        ...state,
        authLoginLoading: true,
      };
    case AUTH_LOGIN_SUCCESS:
      return {
        ...state,
        authLoginLoading: false,
        authLoginSuccess: action.payload,
      };
    case AUTH_LOGIN_ERR:
      return {
        ...state,
        authLoginLoading: false,
        authLoginErr: action.payload,
      };
    default:
      return state;
  }
};


export const authSignUpReducer = (state = {}, action) => {
  switch (action.type) {
    case AUTH_SIGNUP_REQUEST:
      return {
        ...state,
        authSignUpLoading: true,
      };
    case AUTH_SIGNUP_SUCCESS:
      return {
        ...state,
        authSignUpLoading: false,
        authSignUpSuccess: action.payload,
      };
    case AUTH_SIGNUP_ERR:
      return {
        ...state,
        authSignUpLoading: false,
        authSignUpErr: action.payload,
      };
    default:
      return state;
  }
};
