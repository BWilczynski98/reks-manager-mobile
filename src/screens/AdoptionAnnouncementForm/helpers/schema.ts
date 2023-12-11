import { errorsDictionary } from "@/helpers/errors-dictionary";
import * as yup from "yup";

export const adoptionAnnouncementFormSchema = yup.object({
  chip: yup.boolean().required(errorsDictionary.required),
  neutered: yup.boolean().required(errorsDictionary),
  vaccinated: yup.boolean().required(errorsDictionary.required),
  dewormed: yup.boolean().required(errorsDictionary.required),
  character: yup.string().required(errorsDictionary.required),
  for_who: yup.string().required(errorsDictionary.required),
  description_of_health: yup.string(),
  description: yup.string().required(errorsDictionary.required),
});

export type AdoptionAnnouncementFormData = yup.InferType<typeof adoptionAnnouncementFormSchema>;
