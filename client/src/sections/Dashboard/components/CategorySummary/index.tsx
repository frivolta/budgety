import React from "react";
import { useTheme } from "styled-components/macro";
import { Card, ProgressBar } from "../../../../lib/components";
import { formatPrice } from "../../../../lib/utils/format";
import { H5, H1, H2, H3, H4 } from "../../../../styles";
import { Theme } from "../../../../styles/types";
import { Category, Expense, UserBudget, UserProfile } from "../../../../types";
import { CategorySummaryWrapper } from "./styled";
import { ResponsiveContainer, PieChart, Pie, Legend } from "recharts";
import { getCategoryByCategoryValue } from "../../../../lib/utils/categories";
import { CategoryItem } from "./components";
const data = [
  { name: "Group A", value: 400, color: "red" },
  { name: "Group B", value: 300, color: "green" },
  { name: "Group C", value: 300, color: "blue" },
  { name: "Group D", value: 200, color: "yellow" },
];

interface Props {
  filteredExpenses: Expense[];
  categories: Category[];
}

interface RechartFormat {
  name: string;
  value: number;
  color: string;
}

export const CategorySummary = ({ filteredExpenses, categories }: Props) => {
  // Expenses by category in readable format
  const mapCategoriesToRechartFormat = (
    expenses: Expense[],
    categories: Category[]
  ) => {
    const readableAmountCategories = expenses.map((expense) => {
      const category = getCategoryByCategoryValue(categories, expense.category);
      const readableExpense = {
        name: category.caption,
        value: parseFloat(expense.amount),
        color: category.color,
      };
      return readableExpense;
    });

    return readableAmountCategories;
  };

  // Remove amount 0 categories

  // Sum same categories into one

  // Controller

  return (
    <CategorySummaryWrapper>
      <H3>Categories</H3>
      <Card height="auto">
        <CategoryItem categoryName="name" color="white" amount={150.0} />
      </Card>
    </CategorySummaryWrapper>
  );
};
