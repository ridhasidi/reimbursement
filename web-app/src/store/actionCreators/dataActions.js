import axios from "axios";
import { FETCH_DATA_SUCCESS, FETCH_DATA_ERROR, FETCH_DATA_LOADING, CREATE_DATA_SUCCESS } from "../actionTypes/dataTypes";

const baseUrl = "http://localhost:4000/reimbursements";

export const fetchData = (token) => {
  return async (dispatch) => {
    try {
      const { data } = await axios({
        method: "GET",
        url: baseUrl,
        headers: {
          access_token: token,
        },
      });
      dispatch(fetchDataSuccess(data));
    } catch (error) {
      dispatch(setDataError(error.response.data));
    } finally {
      dispatch(setDataLoading(false));
    }
  };
};

export const createData = (input, token) => {
  return axios({
    method: "POST",
    url: baseUrl,
    data: input,
    headers: {
      access_token: token,
      "Content-Type": "multipart/form-data",
    },
  });
};

export const createDataSuccess = (payload) => {
  return {
    type: CREATE_DATA_SUCCESS,
    payload,
  };
};

export const fetchDataSuccess = (payload) => {
  return {
    type: FETCH_DATA_SUCCESS,
    payload,
  };
};

export const setDataError = (payload) => {
  return {
    type: FETCH_DATA_ERROR,
    payload,
  };
};
export const setDataLoading = (payload) => {
  return {
    type: FETCH_DATA_LOADING,
    payload,
  };
};