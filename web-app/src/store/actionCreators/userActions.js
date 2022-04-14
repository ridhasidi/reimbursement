import axios from "axios";
import { LOGIN_SUCCESS, LOGIN_LOADING, LOGIN_ERROR } from "../actionTypes/userTypes";

const baseUrl = "http://localhost:4000";

export const login = (input) => {
  return axios({
    method: "POST",
    url: baseUrl + "/login",
    data: input,
  });
  // async (dispatch) => {
  // try {

  // console.log(data, "???????");
  //   dispatch(loginSuccess(data["access_token"]));

  //   const resp = await axios({
  //     method: "GET",
  //     url: baseUrl + `/${data.id}}`,
  //     headers: {
  //       access_token: data["access_token"],
  //     },
  //   });
  //   console.log(resp.data);
  // } catch (error) {
  //   dispatch(setLoginError(error.data.message));
  // }
  // };
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
