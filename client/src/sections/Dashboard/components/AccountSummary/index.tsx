import React, { useState } from "react";
import { useTheme } from "styled-components";
import { Card } from "../../../../lib/components";
import { expenseTypes } from "../../../../lib/costants";
import { formatPrice } from "../../../../lib/utils/format";
import { H3, H5, H6, Text } from "../../../../styles";
import { Theme } from "../../../../styles/types";
import { Expense, UserProfile } from "../../../../types";
import {
  StyledAccountSummaryInformation,
  StyledAccountSummaryTagWrapper,
} from "./styled";

interface Props {
  expenses: Expense[];
  userProfile: UserProfile;
}

export const AccountSummary = ({ expenses, userProfile }: Props) => {
  const [accountAmount, setAccountAmount] = useState<number>(0);
  const theme = useTheme() as Theme;
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
