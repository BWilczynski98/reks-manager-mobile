import { BASE_URL } from "@env";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "./store";
import * as SecureStore from "expo-secure-store";

export const emptySplitApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: async (headers, { getState, endpoint }) => {
      const token = await SecureStore.getItemAsync("token");
      if (token) {
        headers.set("Authorization", `Token ${token}`);
      }
    },
  }),
  endpoints: () => ({}),
});
