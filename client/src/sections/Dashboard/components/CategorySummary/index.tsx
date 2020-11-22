import React from "react";
import { Card } from "../../../../lib/components";
import { H3 } from "../../../../styles";
import { Category, Expense } from "../../../../types";
import { CategorySummaryWrapper } from "./styled";
import { getCategoryByCategoryValue } from "../../../../lib/utils/categories";
import { CategoryItem } from "./components";

interface Props {
  filteredExpenses: Expense[];
  categories: Category[];
}

interface CategoryReadableFormat {
  name: string;
  value: number;
  color: string;
  isIncome: boolean;
}

export const CategorySummary = ({ filteredExpenses, categories }: Props) => {
  const [readableExpenses, setReadableExpenses] = React.useState<
    CategoryReadableFormat[]
  >([]);
  React.useEffect(() => {
    getCategoriesItems();
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
        isIncome: expense.expenseType === 2,
      };
      return readableExpense;
    });

    return readableAmountCategories;
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

    const noDuplicatesSummedExpenses = summedExpenses.reduce<
      CategoryReadableFormat[]
    >((acc, expense) => {
      if (!acc.some((acc) => acc.name === expense.name)) {
        return [...acc, expense];
      }
      return acc;
    }, []);
    return noDuplicatesSummedExpenses;
  };

  // Sort categories
  const sortExpenses = (expenses: CategoryReadableFormat[]) => {
    const sortedExpenses = expenses.sort((a, b) =>
      a.value > b.value ? -1 : 1
    );
    return sortedExpenses;
  };
  // Controller
  const getCategoriesItems = () => {
    const readableExpenses = mapCategoriesToReadableFormat(
      filteredExpenses,
      categories
    );
    const summedExpenses = sumExpenses(readableExpenses);
    const sortedExpenses = sortExpenses(summedExpenses);
    setReadableExpenses(sortedExpenses);
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
            isIncome={exp.isIncome}
          />
        ))}
      </Card>
    </CategorySummaryWrapper>
  );
};
