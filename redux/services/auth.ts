import { emptySplitApi as api } from "redux/emptyApi";

type SignInType = {
  email: string;
  password: string;
};

const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    signIn: build.mutation<Token, SignInType>({
      query: (loginData: SignInType) => ({
        url: "/auth-token/",
        method: "POST",
        body: loginData,
      }),
    }),
  }),
});

export const {} = injectedRtkApi;
export { injectedRtkApi as authApi };
