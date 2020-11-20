import React, { useState } from "react";
import { useTheme } from "styled-components";
import { Card } from "../../../../lib/components";
import { formatPrice } from "../../../../lib/utils/format";
import { H3, H5 } from "../../../../styles";
import { Theme } from "../../../../styles/types";
import { Expense, MonthlyExpense, UserProfile } from "../../../../types";
import {
  StyledMonthlySummaryInformation,
  StyledMonthlySummaryInfoWrapper,
} from "./styled";

interface Props {
  expenses: Expense[];
}

export const MonthlySummary = ({ expenses }: Props) => {
  const [monthlyExpenses, setMonthlyExpenses] = useState<MonthlyExpense>({
    incomes: 0.0,
    expenses: 0.0,
  });

  const theme = useTheme() as Theme;

  React.useEffect(() => {
    const reducedExpenses = reduceExpensesByType(expenses);
    setMonthlyExpenses(reducedExpenses);
  }, [expenses]);

  const reduceExpensesByType = (expenses: Expense[]) =>
    expenses.reduce<MonthlyExpense>(
      (acc, expense) => {
        return expense.expenseType === 1
          ? (acc = {
              ...acc,
              expenses: acc.expenses + parseFloat(expense.amount),
            })
          : (acc = {
              ...acc,
              incomes: acc.incomes + parseFloat(expense.amount),
            });
      },
      { incomes: 0, expenses: 0 }
    );

  return (
    <StyledMonthlySummaryInfoWrapper>
      <Card
        height="auto"
        margin={theme.space.s}
        backgroundColor={theme.colors.primary}
      >
        <StyledMonthlySummaryInformation>
          <H5>Incomes</H5>
          <H3 weight="500">
            {formatPrice(monthlyExpenses.incomes.toString())}
          </H3>
        </StyledMonthlySummaryInformation>
      </Card>
      <Card height="auto" margin={theme.space.s}>
        <StyledMonthlySummaryInformation>
          <H5>Expenses</H5>
          <H3 weight="500">
            {formatPrice(monthlyExpenses.expenses.toString())}
          </H3>
        </StyledMonthlySummaryInformation>
      </Card>
    </StyledMonthlySummaryInfoWrapper>
  );
};
