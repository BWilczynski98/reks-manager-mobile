import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { emptySplitApi as api } from "redux/emptyApi";

type SignInType = {
  username: string;
  password: string;
};

export interface Root {
  data: Data;
}

export interface Data {
  token: string;
}

type UserResponse = {
  pk: string;
  email: string;
  first_name: string;
  last_name: string;
};

const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    signIn: build.mutation({
      query: (loginData: SignInType) => ({
        url: "/auth-token/",
        method: "POST",
        body: loginData,
      }),
    }),
    logout: build.mutation({
      query: () => ({
        url: "/auth/logout/",
        method: "POST",
      }),
    }),
    getUserData: build.query<UserResponse, void>({
      query: () => ({
        url: "/auth/user/",
        method: "GET",
      }),
    }),
    getAnotherData: build.query<UserResponse, void>({
      query: () => ({
        url: "/auth/user/",
        method: "GET",
      }),
    }),
  }),
});

export const { useSignInMutation, useLogoutMutation, useGetUserDataQuery, useGetAnotherDataQuery } = injectedRtkApi;
export { injectedRtkApi as authApi };
