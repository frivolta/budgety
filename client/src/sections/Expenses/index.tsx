import React, { FC, useState, useEffect } from "react";
import {
  GridPageLayout,
  LoadingScreen,
  Card,
  MonthSelector,
} from "../../lib/components";
import useAuthContext from "../../lib/auth/useAuthContext";
import { Expense, Category } from "../../types";
import { getExpenses, getCategories } from "../../lib/api/queries";
import { toasterError } from "../../lib/utils/toaster";
import { ExpensesContainer, SingleExpenseModal } from "./components";
import { Link } from "react-router-dom";
import { useSingleExpenseModalValue } from "../../lib/context";

interface Error {
  hasErrors: boolean;
  errorMessage: string | undefined;
}

export const Expenses: FC = () => {
  //Refactor:
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  //Refactor ends
  const [currentUser, isLoadingCurrentUser] = useAuthContext();
  const [expenses, setExpenses] = useState<Expense[] | null>(null);
  const [categories, setCategories] = useState<Category[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [, setError] = useState<Error>({
    hasErrors: false,
    errorMessage: undefined,
  });

  const { isModalOpen } = useSingleExpenseModalValue();

  // Get categories from firestore
  const getInitialData = React.useCallback(async (userUid: string) => {
    setIsLoading(true);
    clearErrors();
    try {
      const expenses = await getExpenses(userUid);
      const categories = await getCategories(userUid);
      expenses && setExpenses(expenses as Expense[]);
      categories && setCategories(categories as Category[]);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setError({
        hasErrors: true,
        errorMessage: "We couldn't get your expenses, try again later...",
      });
      toasterError("Error retrieving your expenses, try again later...");
      console.error("[err]: Error getting expenses: ", error);
    }
  }, []);

  useEffect(() => {
    !isModalOpen && currentUser?.uid && getInitialData(currentUser.uid);
  }, [currentUser, getInitialData, isModalOpen]);

  const clearErrors = () =>
    setError({ errorMessage: undefined, hasErrors: false });

  if (isLoading || isLoadingCurrentUser) {
    return <LoadingScreen loadingText="Loading expenses..." />;
  }

  if (isModalOpen) {
    return <SingleExpenseModal />;
  }

  const expensesContainerElement =
    expenses && categories && currentUser ? (
      <GridPageLayout user={currentUser} sectionName="Expenses">
        <MonthSelector currentMonth={currentMonth} />
        <ExpensesContainer expenses={expenses} categories={categories} />
      </GridPageLayout>
    ) : (
      <Card height="auto">
        You don't have any expense yet...{" "}
        <Link to="/add-expense">Create one.</Link>
      </Card>
    );

  return <>{expensesContainerElement}</>;
};
