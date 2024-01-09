import { emptySplitApi as api } from "redux/emptyApi";

const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    getAnimalHealthCard: build.query<HealthCard, string>({
      // To download the health card, an id is required, which is stored in the animal's facility under the health-card -> animal key
      query: (id) => ({
        url: `/api/health-card/${id}/`,
        method: "GET",
      }),
    }),
    addVeterinaryVisit: build.mutation<VeterinaryVisit, any>({
      query: (body) => ({
        url: "/api/veterinary-visit/",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useGetAnimalHealthCardQuery, useAddVeterinaryVisitMutation } = injectedRtkApi;
export { injectedRtkApi as healthCardApi };
