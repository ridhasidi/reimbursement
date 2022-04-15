import axios from "axios";
import { FETCH_DATA_SUCCESS, FETCH_DATA_ERROR, FETCH_DATA_LOADING, CREATE_DATA_SUCCESS, UPDATE_STATUS_ERROR } from "../actionTypes/dataTypes";

const baseUrl = "https://ridhasidi-reimbursement.herokuapp.com/reimbursements";

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

export const updateStatus = (input) => {
  // console.log(input.StatusId, "?????????");
  return axios({
    method: "PATCH",
    url: baseUrl + `/${input.id}`,
    data: {
      StatusId: input.StatusId,
    },
    headers: {
      access_token: input["access_token"],
    },
  });
};

// export const updateStatusSuccess = (payload) => {
//   return {
//     type: UPDATE_STATUS_SUCCESS,
//     payload,
//   };
// };

export const setUpdateStatusError = (payload) => {
  return {
    type: UPDATE_STATUS_ERROR,
    payload,
  };
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
