import { applyMiddleware, combineReducers, legacy_createStore } from "@reduxjs/toolkit";
import { reducer as appReducer } from "./reducer";
import thunk from "redux-thunk";

const rootReducer=combineReducers({appReducer})
const store = legacy_createStore(rootReducer,applyMiddleware(thunk))
export default store ;
