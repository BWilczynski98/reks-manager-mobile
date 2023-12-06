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
  animal_type: AnimalType;
  breed: string;
  gender: AnimalGender;
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
