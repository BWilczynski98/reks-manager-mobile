import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type userState = {
  token: string | null;
};

const initialState = {
  token: null,
} as userState;

export const user = createSlice({
  name: "user",
  initialState,
  reducers: {
    signIn: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    logout: (state) => {
      state.token = null;
    },
  },
});

export const { signIn, logout } = user.actions;
export default user.reducer;
