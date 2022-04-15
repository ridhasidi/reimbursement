import { LOGIN_SUCCESS, LOGIN_ERROR, LOGIN_LOADING, READ_USER, UPDATE_USER } from "../actionTypes/userTypes";

const initialState = {
  user: {},
  access_token: null,
  id: null,
  role: null,
  error: null,
  loading: true,
};

export default function usersReducers(state = initialState, action) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        access_token: action.payload["access_token"],
        id: action.payload.id,
        role: action.payload.role,
      };

    case LOGIN_ERROR:
      return {
        ...state,
        error: action.payload,
      };

    case LOGIN_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case READ_USER || UPDATE_USER:
      return {
        ...state,
        user: action.payload,
      };

    default:
      return {
        ...state,
      };
  }
}
