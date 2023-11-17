import { FontAwesome5 } from "@expo/vector-icons";

type FilterAnimalGenreType = {
  icon: string;
  value: string;
};

type FilterAnimalGenderType = FilterAnimalGenreType;

type FilterAnimalStatusType = {
  label: string;
  value: string;
};

type FilterAnimalResidenceType = FilterAnimalStatusType;

const filterAnimalGenre: FilterAnimalGenreType[] = [
  { icon: "cat", value: "cat" },
  { icon: "dog", value: "dog" },
];

const filterAnimalGender: FilterAnimalGenderType[] = [
  { icon: "male-symbol", value: "male" },
  { icon: "female-symbol", value: "female" },
];

const filterAnimalStatus: FilterAnimalStatusType[] = [
  { label: "Adoptowany", value: "ZAADOPTOWANY" },
  { label: "Do adopcji", value: "DO_ADOPCJI" },
  { label: "Nie do adopcji", value: "NIE_DO_ADOPCJI" },
  { label: "Kwarantanna", value: "KWARANTANNA" },
];

const filterAnimalResidence: FilterAnimalResidenceType[] = [
  { label: "Siedziba", value: "Siedziba" },
  { label: "Dom tymczasowy", value: "Dom tymczasowy" },
];

export { filterAnimalGenre, filterAnimalGender, filterAnimalStatus, filterAnimalResidence };
