import React, { FC, useState } from "react";
import { FormikForm } from "./styled";
import { useFormik } from "formik";
import { toasterError, toasterSuccess } from "../../lib/utils/toaster";
import moment from "moment";
import {
  GridLayout,
  Card,
  CustomInput,
  CustomLabel,
  CustomButton,
} from "../../lib/components";
import Calendar from "react-calendar";
import useAuthContext from "../../lib/auth/useAuthContext";
import { LoadingScreen } from "../../lib/components";
import { FirebaseError } from "firebase";
import { expenseTypes } from "../../lib/costants/expenseTypes";
import { categoryTypes } from "../../lib/costants/categoryTypes";
import { Expense } from "../../types";
import CurrencyInput from "../../lib/components/CurrencyInput/index";
import {
  EDIT_SETTINGS_ERROR,
  EDIT_SETTINGS_SUCCESS,
} from "../../lib/messages/index";
import { start } from "repl";
import { CustomSelect } from "../../lib/components/CustomSelect";

interface Props {
  userUid: string;
}

const defaultExpense: Expense = {
  amount: 0,
  date: moment.now(),
  description: "",
  expenseType: expenseTypes[0].id,
  categoryType: categoryTypes[0].id,
};

export const AddExpense: FC<Props> = ({ userUid }) => {
  const [currentUser, userIsLoading] = useAuthContext();
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<FirebaseError | undefined>(undefined);

  React.useEffect(() => {
    console.log(startDate);
  }, [startDate]);

  const formik = useFormik({
    initialValues: {
      amount: defaultExpense.amount,
      date: defaultExpense.date,
      description: defaultExpense.description,
      expenseType: defaultExpense.expenseType,
      categoryType: defaultExpense.categoryType,
    },
    enableReinitialize: false,
    onSubmit: async (values) => {
      setIsLoading(true);
      try {
        console.log(values);
        toasterSuccess(EDIT_SETTINGS_SUCCESS.settingsUpdated);
        setIsLoading(false);
      } catch (error) {
        toasterError(EDIT_SETTINGS_ERROR.genericError);
        console.error(error);
        setError(error);
        setIsLoading(false);
      }
    },
  });

  if (error) {
    toasterError("We couldn't fetch your data");
    console.error(error);
  }

  if (userIsLoading) {
    return <LoadingScreen loadingText="Loading balance..." />;
  }

  const errorElement = error ? (
    <CustomLabel type="error">{error && error.message}</CustomLabel>
  ) : null;

  return (
    <GridLayout title="Edit Settings">
      <Card customWidth={100}>
        <FormikForm onSubmit={formik.handleSubmit}>
          <CurrencyInput
            name="amount"
            label="Amount"
            value={formik.values.amount}
            prefix="€ "
            decimalsLimit={2}
            allowDecimals={true}
            onChange={formik.handleChange}
          />
          <CustomSelect />
          <Calendar
            onChange={(date: any) => setStartDate(date)}
            value={startDate}
          />
          {errorElement}
          <CustomButton
            text="Confirm"
            disabled={!formik.isValid || !formik.dirty || isLoading}
            margin="32px 0 16px 0"
            isLoading={isLoading}
            data-testid="SubmitButton"
          />
        </FormikForm>
      </Card>
    </GridLayout>
  );
};
