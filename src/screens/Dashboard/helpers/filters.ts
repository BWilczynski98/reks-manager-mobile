type filterCriteria = {
  label: string;
  value: string;
};

type filterConditions = filterCriteria[];

export type FilterState = {
  typeFilters: string[];
  genderFilters: string[];
  locationFilters: string[];
  statusFilters: string[];
};

const filterAnimalType: filterConditions = [
  { label: "Kot", value: "KOT" },
  { label: "Pies", value: "PIES" },
];

const filterAnimalGender: filterConditions = [
  { label: "Samiec", value: "SAMIEC" },
  { label: "Samica", value: "SAMICA" },
];

const filterAnimalStatus: filterConditions = [
  { label: "Adoptowany", value: "ZAADOPTOWANY" },
  { label: "Do adopcji", value: "DO_ADOPCJI" },
  { label: "Brak", value: "NIE_DO_ADOPCJI" },
  { label: "Kwarantanna", value: "KWARANTANNA" },
];

const filterAnimalLocation: filterConditions = [
  { label: "Siedziba", value: "SCHRONISKO" },
  { label: "Dom tymczasowy", value: "TYMCZASOWY_DOM" },
];

export { filterAnimalGender, filterAnimalType, filterAnimalLocation, filterAnimalStatus };
