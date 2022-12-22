import { configureStore } from "@reduxjs/toolkit";

import SettingReducer, { initSetting } from "./setting-reducer";
import AuthReducer, { initAuth } from "./auth-reducer";
import AppReducer, { initApp } from "./app-reducer";
import api from "api";

const reducer = {
  settings: SettingReducer,
  auth: AuthReducer,
  app: AppReducer,
  ...api.reducers,
};

const preloadedState = {
  settings: initSetting,
  auth: initAuth,
  app: initApp,
};

const apiMiddlewares = api.middlewares;

const store = configureStore({
  reducer,
  preloadedState,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiMiddlewares),
});

export default store;
