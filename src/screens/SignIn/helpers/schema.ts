import { errorsDictionary } from "@/helpers/errors-dictionary";
import * as yup from "yup";

export const userAuthFormSchema = yup.object({
  username: yup.string().email(errorsDictionary.not_valid_email_address).required(errorsDictionary.required),
  password: yup
    .string()
    .required(errorsDictionary.required)
    .matches(/^(?!.*[ąćęłńóśźżĄĆĘŁŃÓŚŹŻ])[a-zA-Z0-9!@#$%^&*()-_=+]+$/, errorsDictionary.not_allowed_signs),
});
