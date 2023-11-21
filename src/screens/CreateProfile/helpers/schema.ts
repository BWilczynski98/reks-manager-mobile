import { errorsDictionary } from "@/helpers/errors-dictionary";
import * as yup from "yup";

export const animalProfileFormSchema = yup.object({
  name: yup.string().required(errorsDictionary.required),
  type: yup.string().required(errorsDictionary.required),
  gender: yup.string().required(errorsDictionary.required),
  bread: yup.string(),
  birthDate: yup.date().required(errorsDictionary.required).typeError(errorsDictionary.incorrect_date),
  description: yup.string(),
  status: yup.string().required(errorsDictionary.required),
  locationWhereFound: yup.string().required(errorsDictionary.required),
  dateWhenFound: yup
    .date()
    .min(yup.ref("birthDate"), "Data zabezpieczenia nie może być przed datą urodzenia")
    .required(errorsDictionary.required)
    .typeError(errorsDictionary.incorrect_date),
  residence: yup.string().required(errorsDictionary.incorrect_date),
  temporaryHome: yup.string().when("residence", {
    is: "DOM_TYMCZASOWY",
    then: (schema) => schema.required(errorsDictionary.required),
  }),
  descriptionOfHealth: yup.string(),
  // image: yup.string(),
});

export type AnimalProfileFormData = yup.InferType<typeof animalProfileFormSchema>;
