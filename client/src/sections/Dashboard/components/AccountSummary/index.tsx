import React, { useState } from "react";
import { Card } from "../../../../lib/components";
import { expenseTypes } from "../../../../lib/costants";
import { formatPrice } from "../../../../lib/utils/format";
import { H3 } from "../../../../styles";
import { Expense, UserProfile } from "../../../../types";
import { StyledAccountSummaryInformation } from "./styled";

interface Props {
  expenses: Expense[];
  userProfile: UserProfile;
}

export const AccountSummary = ({ expenses, userProfile }: Props) => {
  const [accountAmount, setAccountAmount] = useState<number>(0);
  const getTotalExpensesAmount = () =>
    expenses.reduce((acc, expense) => {
      const amount = parseFloat(expense.amount);
      return expense.expenseType === expenseTypes[0].id
        ? acc - amount
        : acc + amount;
    }, 0.0);

  const getTotalAccountAmount = () =>
    parseFloat(userProfile.startingBalance) + getTotalExpensesAmount();

  // Get initital amount
  React.useEffect(() => {
    setAccountAmount(getTotalAccountAmount());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Card height="auto">
        <StyledAccountSummaryInformation>
          <H3>{userProfile.accountName}</H3>
          <H3 weight="500">{formatPrice(accountAmount.toString())}</H3>
        </StyledAccountSummaryInformation>
      </Card>
    </>
  );
};
