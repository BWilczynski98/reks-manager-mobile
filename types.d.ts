enum AnimalType {
  CAT = "KOT",
  DOG = "PIES",
}

enum AnimalGender {
  MALE = "SAMIEC",
  FEMALE = "SAMICA",
}

type Token = {
  token: string;
};

type Animals = Animal[];

type Animal = {
  id: string;
  name: string;
  slug: string;
  animal_type: string;
  breed: string;
  gender: string;
  birth_date: string;
  description: string;
  status: string;
  location_where_found: string;
  date_when_found: string;
  description_of_health: string;
  residence: string;
  image: string;
  temporary_home: any;
  added_by: AddedBy;
  adopted_by?: AdoptedBy;
  health_card: HealthCard;
  health_card_id: string;
  size: string;
  chip: boolean;
  neutered: boolean;
  vaccinated: boolean;
  dewormed: boolean;
  character: string;
  for_who: string;
  created_at: string;
  updated_at: string;
};

type Adopter = {
  id: string;
  name: string;
  phone_number: string;
  address: string;
  created_at: string;
  updated_at: string;
};

type AddedBy = {
  first_name: string;
  last_name: string;
};

type HealthCard = {
  id: string;
  animal: string;
  allergies: Allergy[];
  medications: Medication[];
  vaccinations: Vaccination[];
  veterinary_visits: VeterinaryVisit[];
};

type Allergy = {
  allergy: AllergyType;
  description: string;
};

type AllergyType = {
  id: number;
  category: string;
  name: string;
  description: string;
  created_at: string;
  updated_at: string;
};

type Medication = {
  medication: MedicationType;
  description: string;
};

type MedicationType = {
  id: number;
  name: string;
  description: string;
  created_at: string;
  updated_at: string;
};

type Vaccination = {
  vaccination: VaccinationType;
  vaccination_date: string;
  description: string;
};

type VaccinationType = {
  id: number;
  name: string;
  description: string;
  created_at: string;
  updated_at: string;
};

type VeterinaryVisit = {
  id: number;
  doctor: string;
  date: string;
  description: string;
  created_at: string;
  updated_at: string;
  health_card: string;
};
