import { emptySplitApi as api } from "redux/emptyApi";

const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    getAnimalHealthCard: build.query<HealthCard, string>({
      query: (id) => ({
        url: `/api/health-card/${id}/`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetAnimalHealthCardQuery } = injectedRtkApi;
export { injectedRtkApi as healthCardApi };
