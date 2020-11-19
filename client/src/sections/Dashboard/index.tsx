import React, { useState } from "react";
import { useHistory } from "react-router";
import { auth } from "../../lib/api/firebase";
import useAuthContext from "../../lib/auth/useAuthContext";
import { GridPageLayout } from "../../lib/components/GridPageLayout";
import { PageWrapper } from "../../lib/components/PageWrapper";
import { useFilterExpenses } from "../../lib/context";
import { useUserProfile } from "../../lib/hooks/useUserProfile";
import { Category, Expense } from "../../types";

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

  const history = useHistory();

  const dashboardElement =
    currentUser && !isLoadingCurrentUser ? (
      <PageWrapper>
        <GridPageLayout user={currentUser} sectionName="Dashboard">
          {userProfile?.id}
        </GridPageLayout>
      </PageWrapper>
    ) : null;

  return <>{dashboardElement}</>;
};
