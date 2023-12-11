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
  }),
});

export const {
  useGetAnimalsQuery,
  usePostAnimalMutation,
  useDeleteAnimalMutation,
  useEditAnimalMutation,
  useAdoptionAnnouncementMutation,
} = injectedRtkApi;
export { injectedRtkApi as animalApi };
