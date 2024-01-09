import { errorsDictionary } from "@/helpers/errors-dictionary";
import * as yup from "yup";

export const animalProfileFormSchema = yup.object({
  name: yup.string().required(errorsDictionary.required),
  animal_type: yup.string().required(errorsDictionary.required),
  size: yup.string().when("animal_type", { is: "PIES", then: (schema) => schema.required(errorsDictionary.required) }),
  gender: yup.string().required(errorsDictionary.required),
  breed: yup.string(),
  birth_date: yup.date().required(errorsDictionary.required).typeError(errorsDictionary.incorrect_date),
  status: yup.string(),
  location_where_found: yup.string().required(errorsDictionary.required),
  date_when_found: yup
    .date()
    .min(yup.ref("birth_date"), "Data zabezpieczenia nie może być przed datą urodzenia")
    .required(errorsDictionary.required)
    .typeError(errorsDictionary.incorrect_date),
  residence: yup.string().required(errorsDictionary.incorrect_date),
  temporary_home: yup.string().when("residence", {
    is: "DOM_TYMCZASOWY",
    then: (schema) => schema.required(errorsDictionary.required),
  }),
  image: yup.mixed(),
});

export type AnimalProfileFormData = yup.InferType<typeof animalProfileFormSchema>;
