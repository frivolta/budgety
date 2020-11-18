import React, { FC } from "react";
import { useHistory } from "react-router-dom";
import { Button, Card, LoadingScreen } from "../../../../lib/components";
import { H4 } from "../../../../styles";
import { Expense, Category } from "../../../../types";
import { ExpenseCard } from "../ExpenseCard";

interface Props {
  expenses: Expense[];
  categories: Category[];
  isLoading: Boolean;
}

export const ExpensesContainer: FC<Props> = ({
  expenses,
  categories,
  isLoading,
}) => {
  const history = useHistory();

  function redirectToNewExpenses() {
    history.push("/add-expense");
  }

  const expenseElements = expenses.length ? (
    expenses.map((expense, index) => (
      <ExpenseCard expense={expense} categories={categories} key={index} />
    ))
  ) : (
    <Card height="auto">
      <H4>You don't have any expense for this month yet...</H4>
      <Button text="Add an expense" handleClick={redirectToNewExpenses} />
    </Card>
  );

  const loadingElement = (
    <LoadingScreen loadingText="Loading expenses..." inPageLoader />
  );

  return <> {isLoading ? loadingElement : expenseElements}</>;
};
