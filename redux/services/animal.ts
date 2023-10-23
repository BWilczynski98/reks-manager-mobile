import { emptySplitApi as api } from "redux/emptyApi";

const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({}),
});

export const {} = injectedRtkApi;
export { injectedRtkApi as animalApi };
