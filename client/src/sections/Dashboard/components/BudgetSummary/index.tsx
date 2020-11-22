import React from "react";
import { useTheme } from "styled-components/macro";
import { Card, ProgressBar } from "../../../../lib/components";
import { formatPrice } from "../../../../lib/utils/format";
import { H5, H1, H2, H3, H4 } from "../../../../styles";
import { Theme } from "../../../../styles/types";
import { Expense, UserBudget, UserProfile } from "../../../../types";
import { MonthlyBudgetWrapper } from "./styled";

interface Props {
  filteredExpenses: Expense[];
  budget: UserBudget;
  userProfile: UserProfile;
}

interface ExpenseByBudget {
  total: number;
  used: number;
  perc: number;
}

interface ExpensesByBudget {
  needs: ExpenseByBudget;
  wants: ExpenseByBudget;
  savings: ExpenseByBudget;
}

const inititalExpensesByBudgetState: ExpensesByBudget = {
  needs: {
    total: 0,
    used: 0,
    perc: 0,
  },
  wants: {
    total: 0,
    used: 0,
    perc: 0,
  },
  savings: {
    total: 0,
    used: 0,
    perc: 0,
  },
};

export const BudgetSummary = ({
  filteredExpenses,
  budget,
  userProfile,
}: Props) => {
  const [
    expensesByBudgetState,
    setExpensesByBudgetState,
  ] = React.useState<ExpensesByBudget>(inititalExpensesByBudgetState);
  const theme = useTheme() as Theme;
  const {
    needs,
    needsBackground,
    wants,
    wantsBackground,
    incomes,
    incomesBackground,
  } = theme.colors;

  // Get How Much is used per budget
  // 1) Get Total budget per category and transform it into value from percentage
  // 2) Get the sum of expense per budget
  // 3) Get the percentage of every budget dividing the 2) by 1) and % => I hav the completed

  React.useEffect(() => {
    getBudgetPercentage();
  }, [filteredExpenses]);

  interface TotalBudgetAmounts {
    wantsAmount: number;
    needsAmount: number;
    savingsAmount: number;
  }

  const getTotalBudgetAmounts = (
    userProfile: UserProfile,
    budget: UserBudget
  ): TotalBudgetAmounts => {
    const { monthlyBudget } = userProfile;
    const { wants, needs, savings } = budget;

    return {
      wantsAmount: (wants * parseFloat(monthlyBudget)) / 100,
      needsAmount: (needs * parseFloat(monthlyBudget)) / 100,
      savingsAmount: (savings * parseFloat(monthlyBudget)) / 100,
    };
  };

  interface TotalExpensesByBudgetAmount {
    totalExpenses: number;
    wantsByBudget: number;
    needsByBudget: number;
    savingsByBudget: number;
  }

  const getExpensesByBudget = (
    expenses: Expense[],
    userProfile: UserProfile
  ) => {
    const expensesByBudgetAmounts = expenses.reduce<TotalExpensesByBudgetAmount>(
      (acc, expense) => {
        if (expense.categoryType === 2) {
          return {
            ...acc,
            totalExpenses: acc.totalExpenses + parseFloat(expense.amount),
            wantsByBudget: acc.wantsByBudget + parseFloat(expense.amount),
          };
        }
        if (expense.categoryType === 1) {
          return {
            ...acc,
            totalExpenses: acc.totalExpenses + parseFloat(expense.amount),
            needsByBudget: acc.needsByBudget + parseFloat(expense.amount),
          };
        }
        return {
          ...acc,
          totalExpenses: acc.totalExpenses,
        };
      },
      {
        totalExpenses: 0,
        wantsByBudget: 0,
        needsByBudget: 0,
        savingsByBudget: 0,
      }
    );

    expensesByBudgetAmounts.savingsByBudget =
      parseFloat(userProfile.monthlyBudget) -
      expensesByBudgetAmounts.totalExpenses;

    return expensesByBudgetAmounts;
  };

  const getPercentageCompletion = (
    totalBudgetAmounts: TotalBudgetAmounts,
    expensesByBudget: TotalExpensesByBudgetAmount
  ) => {
    const { wantsAmount, needsAmount, savingsAmount } = totalBudgetAmounts;
    const { needsByBudget, wantsByBudget, savingsByBudget } = expensesByBudget;

    return {
      needsCompleted: (needsByBudget / needsAmount) * 100,
      wantsCompleted: (wantsByBudget / wantsAmount) * 100,
      savingsCompleted: (savingsByBudget / savingsAmount) * 100,
    };
  };

  const getBudgetPercentage = () => {
    const totalBudgetAmounts = getTotalBudgetAmounts(userProfile, budget);
    const expensesByBudget = getExpensesByBudget(filteredExpenses, userProfile);
    const percentageCompletion = getPercentageCompletion(
      totalBudgetAmounts,
      expensesByBudget
    );
    const newExpensesByBudget: ExpensesByBudget = {
      needs: {
        total: totalBudgetAmounts.needsAmount,
        used: expensesByBudget.needsByBudget,
        perc: percentageCompletion.needsCompleted,
      },
      wants: {
        total: totalBudgetAmounts.wantsAmount,
        used: expensesByBudget.wantsByBudget,
        perc: percentageCompletion.wantsCompleted,
      },
      savings: {
        total: totalBudgetAmounts.savingsAmount,
        used: expensesByBudget.savingsByBudget,
        perc: percentageCompletion.savingsCompleted,
      },
    };

    setExpensesByBudgetState(newExpensesByBudget);
  };

  return (
    <MonthlyBudgetWrapper>
      <H3>Monthly Budgets</H3>
      <Card height="auto">
        <ProgressBar
          background={needsBackground}
          color={needs}
          completed={
            expensesByBudgetState.needs.perc <= 100
              ? expensesByBudgetState.needs.perc
              : 100
          }
          label={`Needs: ${formatPrice(
            expensesByBudgetState.needs.used.toString()
          )}`}
        />
        <ProgressBar
          background={wantsBackground}
          color={wants}
          completed={
            expensesByBudgetState.wants.perc <= 100
              ? expensesByBudgetState.wants.perc
              : 100
          }
          label={`Wants: ${formatPrice(
            expensesByBudgetState.wants.used.toString()
          )}`}
        />
        <ProgressBar
          background={incomesBackground}
          color={incomes}
          completed={
            expensesByBudgetState.savings.perc <= 100
              ? expensesByBudgetState.savings.perc
              : 100
          }
          label={`Savings: ${formatPrice(
            expensesByBudgetState.savings.used.toString()
          )}`}
        />
      </Card>
    </MonthlyBudgetWrapper>
  );
};
