import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import dataReducer from "./reducers/dataReducers";
import usersReducers from "./reducers/usersReducers";

const rootReducer = combineReducers({ dataReducer, usersReducers });

let store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
