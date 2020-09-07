import React, { FC } from "react";
import { Expense, Category } from "../../../../types";
import moment from "moment";
import {
  StyledExpenseCardBody,
  StyledExpenseCardBodyAmount,
  StyledExpenseCardBodyDescription,
  StyledExpenseCardHeaderDate,
  StyledExpenseCardHeaderCategories,
  StyledExpenseCardHeader,
  StyledExpenseCardContainer,
} from "./styled";

import { H6 } from "../../../../styles/Theme/typography";
import { theme } from "../../../../styles/Theme";
import { Card } from "../../../../lib/components";
import {
  getCategoryByCategoryValue,
  getBudgetTypeById,
} from "../../../../lib/utils/categories";
import { formatPrice } from "../../../../lib/utils/format";
interface Props {
  expense: Expense;
  categories: Category[];
}
const MAX_DESCRIPTION_CHAR = 40;

export const ExpenseCard: FC<Props> = ({ expense, categories }) => {
  const trimLongString = (string: string) => {
    if (string.length > MAX_DESCRIPTION_CHAR) {
      return string.substring(0, MAX_DESCRIPTION_CHAR) + "...";
    }
    return string;
  };

  const expenseCategory = getCategoryByCategoryValue(
    categories,
    expense.category
  );

  const budgetType = getBudgetTypeById(expenseCategory.budgetType);

  return (
    <Card customWidth={100} hoverable>
      <StyledExpenseCardContainer>
        <StyledExpenseCardHeader>
          <StyledExpenseCardHeaderCategories>
            <H6>
              {expenseCategory.caption} {budgetType?.caption}
            </H6>
          </StyledExpenseCardHeaderCategories>
          <StyledExpenseCardHeaderDate>
            <H6 color={theme.colors.darkPrimary}>{moment().format("ll")}</H6>
          </StyledExpenseCardHeaderDate>
        </StyledExpenseCardHeader>
        <StyledExpenseCardBody>
          <StyledExpenseCardBodyDescription>
            {trimLongString(expense.description)}
          </StyledExpenseCardBodyDescription>
          <StyledExpenseCardBodyAmount>
            {formatPrice(expense.amount)}
          </StyledExpenseCardBodyAmount>
        </StyledExpenseCardBody>
      </StyledExpenseCardContainer>
    </Card>
  );
};
