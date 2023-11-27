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
    deleteAnimal: build.mutation<any, string>({
      query: (slug) => ({
        url: `/api/animals/${slug}/`,
        method: "DELETE",
      }),
    }),
  }),
});

export const { useGetAnimalsQuery, usePostAnimalMutation, useDeleteAnimalMutation } = injectedRtkApi;
export { injectedRtkApi as animalApi };
