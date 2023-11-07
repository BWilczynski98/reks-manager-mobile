import { BASE_URL } from "@env";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "./store";

export const emptySplitApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers, { getState, endpoint }) => {
      const token = (getState() as RootState).userReducer.token;
      if (token) {
        headers.set("Authorization", `Token ${token}`);
      }
    },
  }),
  endpoints: () => ({}),
});
