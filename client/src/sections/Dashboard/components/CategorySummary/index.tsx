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

interface CategoryReadableFormat {
  name: string;
  value: number;
  color: string;
}

export const CategorySummary = ({ filteredExpenses, categories }: Props) => {
  const [readableExpenses, setReadableExpenses] = React.useState<
    CategoryReadableFormat[]
  >([]);
  React.useEffect(() => {
    const categoriesItems = getCategoriesItems();
  }, [filteredExpenses]);

  // Expenses by category in readable format
  const mapCategoriesToReadableFormat = (
    expenses: Expense[],
    categories: Category[]
  ): CategoryReadableFormat[] => {
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
  const removeNoAmountCategories = (categories: CategoryReadableFormat[]) => {
    const filteredCategories = categories.filter(
      (category) => category.value === 0
    );
    return filteredCategories;
  };

  // Sum same categories into one
  const sumExpenses = (expenses: CategoryReadableFormat[]) => {
    const summedExpenses = expenses.reduce<CategoryReadableFormat[]>(
      (acc, expense) => {
        const filterExpensesByName = expenses.filter(
          (filteredExpense) => filteredExpense.name === expense.name
        );
        if (filterExpensesByName.length) {
          const summedExpense = filterExpensesByName.reduce(
            (reducedAcc, reducedExpense) => {
              return reducedAcc + reducedExpense.value;
            },
            0.0
          );
          return [...acc, { ...expense, value: summedExpense }];
        }
        return [...acc, { ...expense }];
      },
      []
    );
    return summedExpenses;
  };

  // Sort categories
  // Controller
  const getCategoriesItems = () => {
    const readableExpenses = mapCategoriesToReadableFormat(
      filteredExpenses,
      categories
    );
    const summedExpenses = sumExpenses(readableExpenses);
    setReadableExpenses(summedExpenses);
    console.log(summedExpenses);
  };

  return (
    <CategorySummaryWrapper>
      <H3>Categories</H3>
      <Card height="auto">
        {readableExpenses.map((exp, index) => (
          <CategoryItem
            key={index}
            categoryName={exp.name}
            color={exp.color}
            amount={exp.value}
          />
        ))}
      </Card>
    </CategorySummaryWrapper>
  );
};
