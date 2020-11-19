import React, { useState } from "react";
import { expenseTypes } from "../../../../lib/costants";
import { Expense, UserProfile } from "../../../../types";

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
  }, []);

  return (
    <p>
      {userProfile.accountName}:{accountAmount}
    </p>
  );
};
