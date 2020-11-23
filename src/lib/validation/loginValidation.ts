import * as yup from "yup";
import { LOGIN_ERRORS } from "../messages";
export const LogInSchema = yup.object().shape({
  email: yup.string().required(LOGIN_ERRORS.required),
  password: yup.string().required(LOGIN_ERRORS.required),
});
