import { AnyIfEmpty } from "react-redux";
import { emptySplitApi as api } from "redux/emptyApi";
import { AdopterProfileBody, AdopterProfileResponse } from "redux/types/queryTypes";

type AnimalPostResponse = Animal;

const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    getProfilesOfAllAnimals: build.query<Animals, void>({
      query: () => ({
        url: "/api/animals/",
        method: "GET",
      }),
    }),
    createAnAnimalProfile: build.mutation<AnimalPostResponse, any>({
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
    editAnimal: build.mutation<any, { slug: string; body: any }>({
      query: ({ slug, body }) => ({
        url: `/api/animals/${slug}/`,
        method: "PUT",
        body,
      }),
    }),
    adoptionAnnouncement: build.mutation<any, { slug: string; body: any }>({
      query: ({ slug, body }) => ({
        url: `/api/animals/${slug}/`,
        method: "PATCH",
        body,
      }),
    }),
    adoptionContract: build.mutation<Animal, { slug: string; adopted_by: string }>({
      query: ({ slug, adopted_by }) => ({
        url: `/api/animals/${slug}/`,
        method: "PATCH",
        body: { adopted_by },
      }),
    }),
    getAdopters: build.query<Adopter[], void>({
      query: () => ({
        url: "/api/adopter/",
        method: "GET",
      }),
    }),
    createAdopterProfile: build.mutation<AdopterProfileResponse, AdopterProfileBody>({
      query: (body) => ({
        url: "/api/adopter/",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  useGetProfilesOfAllAnimalsQuery,
  useCreateAnAnimalProfileMutation,
  useDeleteAnimalMutation,
  useEditAnimalMutation,
  useAdoptionAnnouncementMutation,
  useAdoptionContractMutation,
  useGetAdoptersQuery,
  useCreateAdopterProfileMutation,
} = injectedRtkApi;
export { injectedRtkApi as animalApi };
