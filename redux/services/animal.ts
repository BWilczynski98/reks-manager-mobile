import { emptySplitApi as api } from "redux/emptyApi";

type AnimalBodyType = {
  name: string;
  animal_type: string;
  breed?: string;
  gender: string;
  birth_date: string;
  description?: string;
  status: string;
  location_where_found: string;
  date_when_found: string;
  description_of_health?: string;
  residence: string;
  image?: string | null;
  temporary_home?: string;
  adopted_by?: string;
};

type AnimalPostResponse = Animal;

const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    getAnimals: build.query<Animals, void>({
      query: () => ({
        url: "/api/animals/",
        method: "GET",
      }),
    }),
    postAnimal: build.mutation<AnimalPostResponse, AnimalBodyType>({
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
