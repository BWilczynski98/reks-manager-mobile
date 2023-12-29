import { errorsDictionary } from "@/helpers/errors-dictionary";
import * as yup from "yup";

export const adoptionContractFormSchema = yup.object({
  name: yup.string().required(errorsDictionary.required),
  phone_number: yup.string().required(errorsDictionary.required),
  address: yup.string().required(errorsDictionary.required),
});

export type AdoptionContractFormData = yup.InferType<typeof adoptionContractFormSchema>;
