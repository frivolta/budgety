import React, { FC, useState, useEffect } from "react";
import { GridLayout, LoadingScreen } from "../../lib/components";
import useAuthContext from "../../lib/auth/useAuthContext";
import { Expense } from "../../types";
import { getExpenses } from "../../lib/api/queries";
import { toasterError } from "../../lib/utils/toaster";
import { boolean } from "yup";
import { ErrorMessage } from "formik";
import { ExpensesContainer, ExpenseCard } from "./components";

interface Error {
  hasErrors: boolean;
  errorMessage: string | undefined;
}

export const Expenses: FC = () => {
  const [currentUser] = useAuthContext();
  const [expenses, setExpenses] = useState<Expense[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error>({
    hasErrors: false,
    errorMessage: undefined,
  });

  useEffect(() => {
    currentUser?.uid && getInitialData(currentUser.uid);
  }, [currentUser]);

  // Get categories from firestore
  const getInitialData = async (userUid: string) => {
    setIsLoading(true);
    clearErrors();
    try {
      const expenses = await getExpenses(userUid);
      expenses && setExpenses(expenses as Expense[]);
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
  };

  const clearErrors = () =>
    setError({ errorMessage: undefined, hasErrors: false });

  if (isLoading) {
    return <LoadingScreen loadingText="Loading expenses..." />;
  }

  if (error.hasErrors) {
    return (
      <GridLayout title="Expenses">
        Error retrieving your expenses, try again later
      </GridLayout>
    );
  }

  return (
    <GridLayout title="Expenses">
      <ExpensesContainer />
      <ExpenseCard />
    </GridLayout>
  );
};
