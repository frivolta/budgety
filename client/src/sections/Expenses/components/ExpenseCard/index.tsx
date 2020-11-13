import React, { FC } from "react";
import { Expense, Category, CategoryType } from "../../../../types";
import moment from "moment";
import {
  StyledExpenseCardBody,
  StyledExpenseCardBodyAmount,
  StyledExpenseCardBodyDescription,
  StyledExpenseCardHeaderCategories,
  StyledExpenseCardHeader,
  StyledExpenseCardContainer,
  StyledCategoryText,
  StyledBudgetText,
  StyledExpenseCardHeaderDate,
} from "./styled";
import {
  getCategoryByCategoryValue,
  getBudgetTypeById,
} from "../../../../lib/utils/categories";
import {
  formatDateFromTimestamp,
  formatPrice,
} from "../../../../lib/utils/format";
import { Card } from "../../../../lib/components";
import { useTheme } from "styled-components";
import { Theme } from "../../../../styles/types";

interface Props {
  expense: Expense;
  categories: Category[];
}
const MAX_DESCRIPTION_CHAR = 40;

export const ExpenseCard: FC<Props> = ({ expense, categories }) => {
  const expenseDate = formatDateFromTimestamp(expense.date);
  const theme = useTheme() as Theme;
  const {
    needs,
    needsBackground,
    wants,
    wantsBackground,
    incomes,
    incomesBackground,
  } = theme.colors;

  const trimLongString = (string: string) => {
    if (string.length > MAX_DESCRIPTION_CHAR) {
      return string.substring(0, MAX_DESCRIPTION_CHAR) + "...";
    }
    return string;
  };

  const defineBudgetColor = (budget: CategoryType | undefined) => {
    switch (budget?.id) {
      case 1:
        return {
          color: needs,
          backgroundColor: needsBackground,
        };
      case 2:
        return {
          color: wants,
          backgroundColor: wantsBackground,
        };
      default:
        return {
          color: incomes,
          backgroundColor: incomesBackground,
        };
    }
  };

  const expenseCategory = getCategoryByCategoryValue(
    categories,
    expense.category
  );

  const budgetType = getBudgetTypeById(expenseCategory.budgetType);
  const getStyledPrice = (expense: Expense) => {
    const formattedPrice = formatPrice(expense.amount);
    console.log(expense.expenseType);
    const isIncome = expense.expenseType === 2 ? true : false;
    return `${isIncome ? "+" : "-"}${formattedPrice}`;
  };

  const cardElement = (
    <Card height="auto" size="small" margin="0 0 16px 0">
      <StyledExpenseCardContainer>
        <StyledExpenseCardHeader>
          <StyledExpenseCardHeaderCategories>
            <StyledCategoryText categoryColor={expenseCategory.color}>
              {expenseCategory.caption}
            </StyledCategoryText>
            <StyledBudgetText
              color={defineBudgetColor(budgetType).color}
              background={defineBudgetColor(budgetType).backgroundColor}
            >
              {budgetType?.caption}
            </StyledBudgetText>
          </StyledExpenseCardHeaderCategories>
          <StyledExpenseCardHeaderDate>
            {expenseDate}
          </StyledExpenseCardHeaderDate>
        </StyledExpenseCardHeader>
        <StyledExpenseCardBody>
          <StyledExpenseCardBodyDescription>
            {trimLongString(expense.description)}
          </StyledExpenseCardBodyDescription>
          <StyledExpenseCardBodyAmount>
            {getStyledPrice(expense)}
          </StyledExpenseCardBodyAmount>
        </StyledExpenseCardBody>
      </StyledExpenseCardContainer>
    </Card>
  );

  return <div>{cardElement}</div>;
};
