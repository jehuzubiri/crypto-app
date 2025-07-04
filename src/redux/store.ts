import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import appSlice from "./slices/App.slice";

const rootReducers = combineReducers({
  app: appSlice,
});

export const store = configureStore({
  reducer: rootReducers,
  devTools: true, // you can set this to false to hide on live
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
