import React, { FC } from "react";
import { Expense, Category } from "../../../../types";
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
} from "./styled";
import {
  getCategoryByCategoryValue,
  getBudgetTypeById,
} from "../../../../lib/utils/categories";
import { formatPrice } from "../../../../lib/utils/format";
import { Card } from "../../../../lib/components";
import { ExpenseTag } from "../../../../styles";

interface Props {
  expense: Expense;
  categories: Category[];
}
const MAX_DESCRIPTION_CHAR = 40;

export const ExpenseCard: FC<Props> = ({ expense, categories }) => {
  const [isCardActive, setIsCardActive] = React.useState<boolean>(false);
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

  const getStyledPrice = (expense: Expense) => {
    const formattedPrice = formatPrice(expense.amount);
    console.log(expense.expenseType);
    const isIncome = expense.expenseType === 2 ? true : false;
    return `${isIncome ? "+" : "-"}${formattedPrice}`;
  };

  const triggerCardActivation = () => setIsCardActive(!isCardActive);

  const cardElement = (
    <Card
      height="auto"
      handleCLick={triggerCardActivation}
      size="small"
      margin="0 0 16px 0"
    >
      <StyledExpenseCardContainer>
        <StyledExpenseCardHeader>
          <StyledExpenseCardHeaderCategories>
            <StyledCategoryText categoryColor={expenseCategory.color}>
              {expenseCategory.caption}
            </StyledCategoryText>
            <StyledBudgetText>{budgetType?.caption}</StyledBudgetText>
          </StyledExpenseCardHeaderCategories>
          <ExpenseTag color="#ffffff">{moment().format("ll")}</ExpenseTag>
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

  return <div onClick={triggerCardActivation}>{cardElement}</div>;
};
