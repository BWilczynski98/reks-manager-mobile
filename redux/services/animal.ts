import { emptySplitApi as api } from "redux/emptyApi";

export type Root = Root2[];

type Animal = {
  id: string;
  name: string;
};

export interface Root2 {
  id: string;
  name: string;
  slug: string;
  animal_type: string;
  bread: string;
  gender: string;
  birth_date: string;
  description: string;
  status: string;
  location_where_found: string;
  date_when_found: string;
  description_of_health: string;
  residence: string;
  image: string;
  home?: string;
  added_by: AddedBy;
  health_card: HealthCard;
  created_at: string;
  updated_at: string;
}

export interface AddedBy {
  first_name: string;
  last_name: string;
}

export interface HealthCard {
  animal: string;
  allergies: Allergy[];
  medications: Medication[];
  vaccinations: Vaccination[];
  veterinary_visits: VeterinaryVisit[];
}

export interface Allergy {
  allergy: Allergy2;
  description: string;
}

export interface Allergy2 {
  id: number;
  category: string;
  name: string;
  description: string;
  created_at: string;
  updated_at: string;
}

export interface Medication {
  medication: Medication2;
  description: string;
}

export interface Medication2 {
  id: number;
  name: string;
  description: string;
  created_at: string;
  updated_at: string;
}

export interface Vaccination {
  vaccination: Vaccination2;
  vaccination_date: string;
  description: string;
}

export interface Vaccination2 {
  id: number;
  name: string;
  description: string;
  created_at: string;
  updated_at: string;
}

export interface VeterinaryVisit {
  id: number;
  doctor: string;
  date: string;
  description: string;
  created_at: string;
  updated_at: string;
  health_card: string;
}

const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    getAnimals: build.query<Root, void>({
      query: () => ({
        url: "/api/animals/",
        method: "GET",
      }),
      // transformResponse: (response: Root): Animal[] => {
      //   return response.map((animal) => {
      //     return {
      //       id: animal.id,
      //       name: animal.name,
      //     };
      //   });
      // },
    }),
  }),
});

export const { useGetAnimalsQuery } = injectedRtkApi;
export { injectedRtkApi as animalApi };
