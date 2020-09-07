import React, { FC, useState, useEffect } from "react";
import { GridLayout, LoadingScreen, Card } from "../../lib/components";
import useAuthContext from "../../lib/auth/useAuthContext";
import { Expense, Category } from "../../types";
import { getExpenses, getCategories } from "../../lib/api/queries";
import { toasterError } from "../../lib/utils/toaster";
import { boolean } from "yup";
import { ErrorMessage } from "formik";
import { ExpensesContainer, ExpenseCard } from "./components";
import { Link } from "react-router-dom";

interface Error {
  hasErrors: boolean;
  errorMessage: string | undefined;
}

export const Expenses: FC = () => {
  const [currentUser] = useAuthContext();
  const [expenses, setExpenses] = useState<Expense[] | null>(null);
  const [categories, setCategories] = useState<Category[] | null>(null);
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

  const expensesContainerElement =
    expenses && categories ? (
      <ExpensesContainer expenses={expenses} categories={categories} />
    ) : (
      <Card customWidth={100}>
        You don't have any expense yet...{" "}
        <Link to="/add-expense">Create one.</Link>
      </Card>
    );

  return <GridLayout title="Expenses">{expensesContainerElement}</GridLayout>;
};
