import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import userReducer from "./features/userSlice";
import { animalApi } from "./services/animal";
import { authApi } from "./services/auth";
import { healthCardApi } from "./services/healthCard";

export const rootReducer = combineReducers({
  userReducer,
  [authApi.reducerPath]: authApi.reducer,
  [healthCardApi.reducerPath]: healthCardApi.reducer,
  [animalApi.reducerPath]: animalApi.reducer,
});

export const rootMiddleware = [animalApi.middleware];

export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(rootMiddleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
