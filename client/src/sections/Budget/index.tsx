import React from "react";
import useAuthContext from "../../lib/auth/useAuthContext";
import { GridPageLayout } from "../../lib/components/GridPageLayout";
import { BudgetView } from "./components";

export const Budget = () => {
  const [currentUser, isLoadingCurrentUser] = useAuthContext();

  const budgetElement =
    currentUser && !isLoadingCurrentUser ? (
      <GridPageLayout user={currentUser} sectionName="Budget">
        <BudgetView />
      </GridPageLayout>
    ) : null;

  return <>{budgetElement}</>;
};
