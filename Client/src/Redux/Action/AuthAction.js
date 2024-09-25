import axios from "../../Axios/config";

import {
  AUTH_LOGIN_ERR,
  AUTH_LOGIN_REQUEST,
  AUTH_LOGIN_SUCCESS,
  AUTH_SIGNUP_ERR,
  AUTH_SIGNUP_REQUEST,
  AUTH_SIGNUP_SUCCESS,
} from "../Constants/AuthConstant";

// SignupSubmitAction

export const SignUpSubmitAction = (name,email, password) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({ type: AUTH_SIGNUP_REQUEST });

    let { data } = await axios.post("/auth/register", {
      name,
      email,
      password,
    });

    dispatch({ type: AUTH_SIGNUP_SUCCESS, payload: data });
    localStorage.setItem("loginInfo", JSON.stringify(data));
  } catch (error) {
    console.log(error.response, "error.response");
    dispatch({ type: AUTH_SIGNUP_ERR, payload: error.response.data });
  }
};

// Login Action

export const LoginSubmitAction = (email, password) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({ type: AUTH_LOGIN_REQUEST });

    let { data } = await axios.post("/auth/login", {
      email,
      password,
    });
    dispatch({ type: AUTH_LOGIN_SUCCESS, payload: data });
    localStorage.setItem("loginInfo", JSON.stringify(data));
  } catch (error) {
    console.log(error.response, "error.response");
    dispatch({ type: AUTH_LOGIN_ERR, payload: error.response.data });
  }
};
