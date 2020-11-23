import * as yup from "yup";
import { EDIT_SETTINGS_ERROR } from "../messages";

export const EditSettingsSchema = yup.object().shape({
  accountName: yup.string().required(EDIT_SETTINGS_ERROR.balanceNameRequired),
  startingBalance: yup.string().required(EDIT_SETTINGS_ERROR.startingBalance),
  monthlyBudget: yup.string().required(EDIT_SETTINGS_ERROR.monthlyBudget),
});
