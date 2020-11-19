import React, { useState } from "react";
import { useHistory } from "react-router";
import { useTheme } from "styled-components/macro";
import { auth } from "../../lib/api/firebase";
import { getAllExpenses, getCategories } from "../../lib/api/queries";
import useAuthContext from "../../lib/auth/useAuthContext";
import { LoadingScreen, MonthSelector } from "../../lib/components";
import { GridPageLayout } from "../../lib/components/GridPageLayout";
import { PageWrapper } from "../../lib/components/PageWrapper";
import { useFilterExpenses } from "../../lib/context";
import { useUserProfile } from "../../lib/hooks/useUserProfile";
import { Theme } from "../../styles/types";
import { Category, Expense } from "../../types";
import { AccountSummary, MonthlySummary } from "./components";

interface Error {
  hasErrors: boolean;
  errorMessage: string | undefined;
}

export const Dashboard = () => {
  const [currentUser, isLoadingCurrentUser] = useAuthContext();
  const { userProfile, loading: userProfileIsLoading } = useUserProfile();
  const [expenses, setExpenses] = useState<Expense[] | null>(null);
  const [categories, setCategories] = useState<Category[] | null>(null);
  const { filterDate, setFilterDate } = useFilterExpenses();
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setError] = useState<Error>({
    hasErrors: false,
    errorMessage: undefined,
  });

  const theme = useTheme() as Theme;

  React.useEffect(() => {
    if (currentUser?.uid && userProfile) {
      getInitialData(currentUser.uid);
    }
  }, [currentUser, userProfile]);

  // Load expenses, categories
  const getInitialData = async (userId: string) => {
    setIsLoading(true);
    try {
      const expenses = await getAllExpenses(userId);
      const categories = await getCategories(userId);
      console.log(expenses);
      setExpenses(expenses as Expense[]);
      setCategories(categories as Category[]);
    } catch (err) {
      console.error("Error getting initial data", err);
      setError({ hasErrors: true, errorMessage: err.message });
    } finally {
      setIsLoading(false);
    }
  };

  const history = useHistory();

  if (isLoading || userProfileIsLoading) {
    return <LoadingScreen loadingText="Loading initial data..." />;
  }

  const accountSummaryElement =
    expenses && userProfile ? (
      <AccountSummary expenses={expenses} userProfile={userProfile} />
    ) : null;

  const monthSelectorElement = (
    <MonthSelector
      margin={theme.space.xxl}
      currentDate={filterDate}
      handleChangeDate={setFilterDate}
    />
  );

  const monthlySummaryElement = expenses ? (
    <MonthlySummary expenses={expenses} />
  ) : null;

  const dashboardElement =
    currentUser && !isLoadingCurrentUser ? (
      <PageWrapper>
        <GridPageLayout user={currentUser} sectionName="Dashboard">
          {accountSummaryElement}
          {monthSelectorElement}
          {monthlySummaryElement}
        </GridPageLayout>
      </PageWrapper>
    ) : null;

  return <>{dashboardElement}</>;
};
