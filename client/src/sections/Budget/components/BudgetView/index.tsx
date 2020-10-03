import React from "react";
import { Button, Card } from "../../../../lib/components";
import { StyledBudgetViewWrapper } from "./styled";

import { useUserBudget } from "../../../../lib/hooks/useUserBudget";

export const BudgetView = () => {
  const { userBudget, loading: loadingUserBudget } = useUserBudget();

  return <StyledBudgetViewWrapper>budgetView</StyledBudgetViewWrapper>;
};
