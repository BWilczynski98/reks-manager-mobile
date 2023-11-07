import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import * as SecureStore from "expo-secure-store";

enum SECURE_STORE_KEYS {
  TOKEN = "token",
}

type userState = {
  token: string;
};

const initialState = {
  token: "",
} as userState;

async function addTokenToSecureStore(key: string, value: string) {
  await SecureStore.setItemAsync(key, value);
}

async function deleteTokenFromSecureStore(key: string, options?: SecureStore.SecureStoreOptions) {
  await SecureStore.deleteItemAsync(key, options);
}

async function getTokenFromSecureStore(key: string, options?: SecureStore.SecureStoreOptions) {
  const token = await SecureStore.getItemAsync(key, options);
}

export const user = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ token: string }>) => {
      const token = action.payload.token;
      state.token = token;
      addTokenToSecureStore(SECURE_STORE_KEYS.TOKEN, token);
    },
    logout: (state) => {
      state.token = "";
      deleteTokenFromSecureStore(SECURE_STORE_KEYS.TOKEN);
    },
  },
});

export const { login, logout } = user.actions;
export default user.reducer;
