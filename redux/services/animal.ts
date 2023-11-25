import { emptySplitApi as api } from "redux/emptyApi";

type AnimalPostResponse = Animal;

const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    getAnimals: build.query<Animals, void>({
      query: () => ({
        url: "/api/animals/",
        method: "GET",
      }),
    }),
    postAnimal: build.mutation<AnimalPostResponse, any>({
      query: (body) => ({
        url: "/api/animals/",
        method: "POST",
        body: body,
      }),
    }),
  }),
});

export const { useGetAnimalsQuery, usePostAnimalMutation } = injectedRtkApi;
export { injectedRtkApi as animalApi };
