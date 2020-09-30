import React, { FC } from "react";
import { Expense, Category } from "../../../../types";
import { ExpenseCard } from "../ExpenseCard";

interface Props {
  expenses: Expense[];
  categories: Category[];
}

export const ExpensesContainer: FC<Props> = ({ expenses, categories }) => {
  const expenseElements = expenses.map((expense, index) => (
    <ExpenseCard expense={expense} categories={categories} key={index} />
  ));

  return <> {expenseElements}</>;
};
