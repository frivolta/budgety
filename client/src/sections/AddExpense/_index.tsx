import React, { FC, useState } from "react";
import { toasterError } from "../../lib/utils/toaster";
import moment, { now } from "moment";
import { Formik, FormikProps, Field } from "formik";
import {
  GridLayout,
  Card,
  CustomLabel,
  CustomButton,
  CustomCalendar,
  CustomInput,
  CurrencyInput,
} from "../../lib/components";
import useAuthContext from "../../lib/auth/useAuthContext";
import { LoadingScreen } from "../../lib/components";
import { FirebaseError } from "firebase";
import { expenseTypes } from "../../lib/costants/expenseTypes";
import { categoryTypes } from "../../lib/costants/categoryTypes";
import { Expense, Category, ExpenseType } from "../../types";
import { defaultCategories } from "../../lib/initialData";
import { CustomSelect } from "../../lib/components/CustomSelect";
import { FormikForm } from "./styled";
import { getCategories } from "../../lib/api/queries";
import { Option } from "react-select/src/filters";

interface Props {
  userUid: string;
}

const defaultExpense: Expense = {
  amount: 0,
  date: moment.now(),
  description: "No Description",
  expenseType: expenseTypes[0].id,
  categoryType: categoryTypes[0].id,
  category: defaultCategories[0].value,
};

export const AddExpense: FC<Props> = ({ userUid }) => {
  const [currentUser, userIsLoading] = useAuthContext();
  const [categories, setCategories] = useState<Category[] | undefined>(
    undefined
  );
  const [selectableCategories, setSelectableCategories] = useState<
    Option[] | undefined
  >(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<FirebaseError | undefined>(undefined);

  React.useEffect(() => {
    // Get categories if user is available
    if (currentUser && currentUser.uid) {
      getInitialData(currentUser.uid);
    }
  }, [currentUser]);

  // Get categories from firestore
  const getInitialData = async (userUid: string) => {
    const categories = await getCategories(userUid);
    if (categories) {
      setCategories(categories as Category[]);
      defineSelectableCategoriesByExpenseValue(
        categories as Category[],
        "expense"
      );
    }
  };

  const handleChangeExpenseType = (value: string): void => {
    if (categories) {
      const cat = defineSelectableCategoriesByExpenseValue(categories, value);
      console.log(value);
    }
  };

  // Map categories to an object that can be read from select
  const defineSelectableCategoriesByExpenseValue = (
    categories: Category[],
    expenseValue: string
  ) => {
    const expenseValueId =
      expenseTypes.find((expense) => expense.value === expenseValue)?.id || 1;
    const selectableCategories: Option[] = [];
    categories.forEach((category) => {
      if (category.expenseType === expenseValueId) {
        selectableCategories.push({
          value: category.value,
          label: category.caption,
          data: undefined,
        });
      }
    });

    setSelectableCategories(selectableCategories);
  };

  // Map Expense type to an object that can be read from select
  const defineSelectableExpenseTypes = (expenseTypes: ExpenseType[]) => {
    const selectableExpenseTypes = expenseTypes.map((expenseType) => ({
      value: expenseType.value,
      label: expenseType.caption,
    }));
    return selectableExpenseTypes;
  };

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

  const selectFields =
    categories && selectableCategories ? (
      <>
        <Field
          component={() => (
            <CustomSelect options={selectableCategories} name="category" />
          )}
        />
      </>
    ) : null;

  const calendarField = (
    <Field component={() => <CustomCalendar name="date" />} />
  );

  return (
    <GridLayout title="Add expense">
      <Card customWidth={100}>
        <Formik
          initialValues={{ ...defaultExpense }}
          onSubmit={(values, actions) => {
            setTimeout(() => {
              actions.setSubmitting(false);
            }, 1000);
          }}
          enableReinitialize={true}
          validateOnChange={true}
        >
          {(props: FormikProps<any>) => (
            <FormikForm>
              {selectFields}
              {calendarField}
              <Field component={CustomInput} name="description" />
              <Field component={CurrencyInput} name="description" />
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
