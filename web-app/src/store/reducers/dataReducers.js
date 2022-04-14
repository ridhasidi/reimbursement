import { FETCH_DATA_SUCCESS, FETCH_DATA_ERROR, FETCH_DATA_LOADING } from "../actionTypes/dataTypes";

const initialState = {
  data: [],
  error: null,
  loading: true,
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

    default:
      return {
        ...state,
      };
  }
}
