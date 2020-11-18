import React, { FC, useCallback, useState } from "react";
import { GridPageLayout, Card } from "../../lib/components";
import useAuthContext from "../../lib/auth/useAuthContext";
import { LoadingScreen } from "../../lib/components";
import { expenseTypes } from "../../lib/costants/expenseTypes";
import { Expense, Category } from "../../types";
import { getCategories, addExpense } from "../../lib/api/queries";
import { Option } from "react-select/src/filters";
import { NewExpenseForm } from "./components/NewExpenseForm";
import { toasterError, toasterSuccess } from "../../lib/utils/toaster";
import { ADD_EXPENSE_ERRORS, ADD_EXPENSE_SUCCESS } from "../../lib/messages";

interface Props {
  userUid: string;
}

export const AddExpense: FC<Props> = () => {
  const [currentUser, userIsLoading] = useAuthContext();
  const [categories, setCategories] = useState<Category[] | undefined>(
    undefined
  );
  const [isExpenseLoading, setIsExpenseLoading] = useState<boolean>(false);

  // Get categories from firestore
  const getInitialData = useCallback(async (userUid: string) => {
    const categories = await getCategories(userUid);
    if (categories) {
      setCategories(categories as Category[]);
      defineSelectableCategoriesByExpenseValue(
        categories as Category[],
        "expense"
      );
    }
  }, []);

  React.useEffect(() => {
    // Get categories if user is available
    if (currentUser && currentUser.uid) {
      getInitialData(currentUser.uid);
    }
  }, [currentUser, getInitialData]);

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
  };

  //Handle Expense to DB
  const handleExpenseSubmit = (expense: Expense) => {
    setIsExpenseLoading(true);
    try {
      currentUser?.uid && addExpense(currentUser.uid, expense);
      setIsExpenseLoading(false);
      toasterSuccess(ADD_EXPENSE_SUCCESS.expenseAdded);
    } catch (error) {
      setIsExpenseLoading(false);
      console.error("[err]: Error adding expense: ", error);
      toasterError(ADD_EXPENSE_ERRORS.genericError);
    }
  };

  if (userIsLoading) {
    return <LoadingScreen loadingText="Loading balance..." />;
  }

  const formElement = categories ? (
    <NewExpenseForm
      categories={categories}
      isLoading={isExpenseLoading}
      handleSubmit={handleExpenseSubmit}
    />
  ) : null;

  const addExpenseLayout =
    !userIsLoading && currentUser ? (
      <GridPageLayout sectionName="Add expense" user={currentUser}>
        <Card height="auto">{formElement}</Card>
      </GridPageLayout>
    ) : null;

  return <>{addExpenseLayout}</>;
};
