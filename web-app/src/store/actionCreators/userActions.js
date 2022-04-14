import axios from "axios";
import { LOGIN_SUCCESS, LOGIN_LOADING, LOGIN_ERROR } from "../actionTypes/userTypes";

const baseUrl = "http://localhost:4000";

export const login = (input) => {
  return axios({
    method: "POST",
    url: baseUrl + "/login",
    data: input,
  });
};

export const readUser = () => {};

export const loginSuccess = (payload) => {
  return {
    type: LOGIN_SUCCESS,
    payload,
  };
};

export const setLoginError = (payload) => {
  return {
    type: LOGIN_ERROR,
    payload,
  };
};

export const setLoginLoading = (payload) => {
  return {
    type: LOGIN_LOADING,
    payload,
  };
};
