enum AnimalStatusKey {
  AVAILABLE_FOR_ADOPTION = "DO_ADOPCJI",
  ADOPTED = "ZAADOPTOWANY",
  QUARANTINE = "KWARANTANNA",
  NOT_FOR_ADOPTION = "NIE_DO_ADOPCJI",
}

export const transformAnimalStatus = (status: string): string => {
  let transformedAnimalStatus;
  switch (status) {
    case AnimalStatusKey.AVAILABLE_FOR_ADOPTION:
      transformedAnimalStatus = "Do adopcji";
      break;
    case AnimalStatusKey.ADOPTED:
    case "ADOPTED":
      transformedAnimalStatus = "Adoptowany";
      break;
    case AnimalStatusKey.QUARANTINE:
      transformedAnimalStatus = "Kwarantanna";
      break;
    case AnimalStatusKey.NOT_FOR_ADOPTION:
      transformedAnimalStatus = "Brak";
      break;
    default:
      transformedAnimalStatus = "Brak";
      break;
  }

  return transformedAnimalStatus;
};
