import React, { FC } from "react";
import { Link } from "react-router-dom";
import { Card, LoadingScreen } from "../../../../lib/components";
import { H2, H3, H4 } from "../../../../styles";
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
  const expenseElements = expenses.length ? (
    expenses.map((expense, index) => (
      <ExpenseCard expense={expense} categories={categories} key={index} />
    ))
  ) : (
    <Card height="auto">
      <H4>You don't have any expense for this month yet...</H4>
      <Link to="/add-expense">Create one.</Link>
    </Card>
  );

  const loadingElement = (
    <LoadingScreen loadingText="Loading expenses..." inPageLoader />
  );

  return <> {isLoading ? loadingElement : expenseElements}</>;
};
