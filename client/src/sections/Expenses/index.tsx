import React, { FC, useState, useEffect } from "react";
import {
  GridPageLayout,
  LoadingScreen,
  MonthSelector,
} from "../../lib/components";
import useAuthContext from "../../lib/auth/useAuthContext";
import { Expense, Category } from "../../types";
import { getExpenses, getCategories } from "../../lib/api/queries";
import { toasterError } from "../../lib/utils/toaster";
import { ExpensesContainer, SingleExpenseModal } from "./components";
import {
  useFilterExpenses,
  useSingleExpenseModalValue,
} from "../../lib/context";

interface Error {
  hasErrors: boolean;
  errorMessage: string | undefined;
}

export const Expenses: FC = () => {
  //Refactor:
  const { filterDate, setFilterDate } = useFilterExpenses();
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

  //Get month start day and end day

  // Get categories from firestore
  const getInitialData = React.useCallback(
    async (userUid: string, filterDate: Date = new Date()) => {
      const filterStart = new Date(
        filterDate.getFullYear(),
        filterDate.getMonth(),
        1
      );
      const filterEnd = new Date(
        filterDate.getFullYear(),
        filterDate.getMonth() + 1,
        0
      );
      console.log(filterStart, filterEnd);
      setIsLoading(true);
      clearErrors();
      try {
        const expenses = await getExpenses(userUid, filterStart, filterEnd);
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
    },
    []
  );

  useEffect(() => {
    !isModalOpen &&
      currentUser?.uid &&
      getInitialData(currentUser.uid, filterDate);
  }, [currentUser, getInitialData, isModalOpen, filterDate]);

  const clearErrors = () =>
    setError({ errorMessage: undefined, hasErrors: false });

  if (isLoadingCurrentUser) {
    return <LoadingScreen loadingText="Loading user..." />;
  }

  if (isModalOpen) {
    return <SingleExpenseModal />;
  }

  const expensesContainerElement =
    expenses && categories && currentUser ? (
      <GridPageLayout user={currentUser} sectionName="Expenses">
        <MonthSelector
          currentDate={filterDate}
          handleChangeDate={setFilterDate}
        />
        <ExpensesContainer
          expenses={expenses.length ? expenses : []}
          categories={categories}
          isLoading={isLoading}
        />
      </GridPageLayout>
    ) : (
      <LoadingScreen loadingText="Retrieving data..." />
    );

  return <>{expensesContainerElement}</>;
};
