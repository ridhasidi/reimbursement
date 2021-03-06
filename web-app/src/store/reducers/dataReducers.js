import { FETCH_DATA_SUCCESS, FETCH_DATA_ERROR, FETCH_DATA_LOADING, CREATE_DATA_SUCCESS, UPDATE_STATUS_ERROR } from "../actionTypes/dataTypes";

const initialState = {
  data: [],
  error: null,
  loading: true,
  newEntry: {},
  errorUpdate: null,
};

export default function dataReducers(state = initialState, action) {
  switch (action.type) {
    case FETCH_DATA_SUCCESS:
      return {
        ...state,
        data: action.payload,
      };
    case FETCH_DATA_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case FETCH_DATA_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case CREATE_DATA_SUCCESS:
      return {
        ...state,
        newEntry: action.payload,
      };
    case UPDATE_STATUS_ERROR:
      return {
        ...state,
        errorUpdate: action.payload,
      };

    default:
      return {
        ...state,
      };
  }
}
