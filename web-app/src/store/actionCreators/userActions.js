import axios from "axios";
import { LOGIN_SUCCESS, LOGIN_LOADING, LOGIN_ERROR, READ_USER, UPDATE_USER } from "../actionTypes/userTypes";

const baseUrl = "https://ridhasidi-reimbursement.herokuapp.com";

export const login = (input) => {
  return axios({
    method: "POST",
    url: baseUrl + "/login",
    data: input,
  });
};

export const readUser = (id, token) => {
  return async (dispatch) => {
    try {
      const { data } = await axios({
        method: "GET",
        url: baseUrl + `/users/${id}`,
        headers: {
          access_token: token,
        },
      });
      dispatch(readSuccess(data));
    } catch (error) {
      dispatch(setLoginError(error.data.message));
    }
  };
};

export const updateUser = (id, token, input) => {
  return axios({
    method: "PATCH",
    url: baseUrl + `/users/${id}`,
    headers: {
      access_token: token,
    },
    data: input,
  });
};

export const updateSuccess = (payload) => {
  return {
    type: UPDATE_USER,
    payload,
  };
};
export const readSuccess = (payload) => {
  return {
    type: READ_USER,
    payload,
  };
};
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
