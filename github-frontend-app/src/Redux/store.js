import { legacy_createStore, applyMiddleware, combineReducers } from "redux";
import { thunk } from "redux-thunk";
import { reducer } from "./reducer";

const RootReducer = combineReducers({ githubusers: reducer });
export const Store = legacy_createStore(RootReducer, applyMiddleware(thunk));
