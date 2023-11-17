import { emptySplitApi as api } from "redux/emptyApi";

type SignInType = {
  username: string;
  password: string;
};

type SendPasswordResetTokenType = {
  email: string;
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
    sendPasswordResetTokenToUserEmail: build.mutation({
      query: (email: SendPasswordResetTokenType) => ({
        url: "/auth/password/reset/",
        method: "POST",
        body: email,
      }),
    }),
  }),
});

export const {
  useSignInMutation,
  useLogoutMutation,

  useSendPasswordResetTokenToUserEmailMutation,
} = injectedRtkApi;
export { injectedRtkApi as authApi };
