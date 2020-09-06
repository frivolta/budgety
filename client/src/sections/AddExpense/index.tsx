import React, { FC, useState } from "react";
import moment from "moment";
import { GridLayout, Card } from "../../lib/components";
import useAuthContext from "../../lib/auth/useAuthContext";
import { LoadingScreen } from "../../lib/components";
import { expenseTypes } from "../../lib/costants/expenseTypes";
import { categoryTypes } from "../../lib/costants/categoryTypes";
import { Expense, Category } from "../../types";
import { defaultCategories } from "../../lib/initialData";
import { getCategories } from "../../lib/api/queries";
import { Option } from "react-select/src/filters";
import { NewExpenseForm } from "./components/NewExpenseForm";

interface Props {
  userUid: string;
}

export const AddExpense: FC<Props> = ({ userUid }) => {
  const [currentUser, userIsLoading] = useAuthContext();
  const [categories, setCategories] = useState<Category[] | undefined>(
    undefined
  );
  const [selectableCategories, setSelectableCategories] = useState<
    Option[] | undefined
  >(undefined);

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

  if (userIsLoading) {
    return <LoadingScreen loadingText="Loading balance..." />;
  }

  const formElement = categories ? (
    <NewExpenseForm categories={categories} />
  ) : null;

  return (
    <GridLayout title="Add expense">
      <Card customWidth={100}>{formElement}</Card>
    </GridLayout>
  );
};
