import React, { FC, useState } from "react";
import { toasterError, toasterSuccess } from "../../lib/utils/toaster";
import moment from "moment";
import { Formik, Form, FormikProps, Field } from "formik";
import {
  GridLayout,
  Card,
  CustomLabel,
  CustomButton,
} from "../../lib/components";
import useAuthContext from "../../lib/auth/useAuthContext";
import { LoadingScreen } from "../../lib/components";
import { FirebaseError } from "firebase";
import { expenseTypes } from "../../lib/costants/expenseTypes";
import { categoryTypes } from "../../lib/costants/categoryTypes";
import { Expense } from "../../types";
import CurrencyInput from "../../lib/components/CurrencyInput/index";
import { defaultCategories } from "../../lib/initialData";
import { CustomSelect } from "../../lib/components/CustomSelect";
import { FormikForm } from "./styled";
interface Props {
  userUid: string;
}

const defaultExpense: Expense = {
  amount: 0,
  date: moment.now(),
  description: "",
  expenseType: expenseTypes[0].id,
  categoryType: categoryTypes[0].id,
  category: defaultCategories[0].value,
};

const optionss = [
  { value: "1", label: "text" },
  { value: "2", label: "text 2" },
  { value: "1", label: "text 3" },
];

export const AddExpense: FC<Props> = ({ userUid }) => {
  const [currentUser, userIsLoading] = useAuthContext();
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<FirebaseError | undefined>(undefined);

  if (error) {
    toasterError("We couldn't submit your expense");
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
        <Formik
          initialValues={{
            email: "",
            firstName: "red",
            lastName: "",
            category: "",
          }}
          onSubmit={(values, actions) => {
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2));
              actions.setSubmitting(false);
            }, 1000);
          }}
        >
          {(props: FormikProps<any>) => (
            <FormikForm>
              <Field
                component={CustomSelect}
                name="category"
                options={optionss}
              />
              <CustomButton
                text="Confirm"
                disabled={!props.isValid || !props.dirty || isLoading}
                margin="32px 0 16px 0"
                isLoading={isLoading}
                data-testid="SubmitButton"
              />
            </FormikForm>
          )}
        </Formik>
        {errorElement}
      </Card>
    </GridLayout>
  );
};
