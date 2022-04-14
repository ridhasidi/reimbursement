import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import dataReducer from "./reducers/dataReducers";

const rootReducer = combineReducers({ dataReducer });

let store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
