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
  StyledCategoryText,
  StyledBudgetText,
} from "./styled";

import { H4 } from "../../../../styles/Theme/typography";
import { Card, CustomSmallButton } from "../../../../lib/components";
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

  const cardElement = isCardActive ? (
    <Card customWidth={100} hoverable onClick={triggerCardActivation}>
      <StyledExpenseCardContainer>
        <StyledExpenseCardHeader>
          <H4>DO YOU WANT TO DELETE THIS EXPENSE?</H4>
        </StyledExpenseCardHeader>
        <StyledExpenseCardBody>
          <CustomSmallButton
            text="DELETE"
            handleClick={() => console.log("delete")}
          />
        </StyledExpenseCardBody>
      </StyledExpenseCardContainer>
    </Card>
  ) : (
    <Card customWidth={100} hoverable onClick={triggerCardActivation}>
      <StyledExpenseCardContainer>
        <StyledExpenseCardHeader>
          <StyledExpenseCardHeaderCategories>
            <StyledCategoryText categoryColor={expenseCategory.color}>
              {expenseCategory.caption}
            </StyledCategoryText>
            <StyledBudgetText>{budgetType?.caption}</StyledBudgetText>
          </StyledExpenseCardHeaderCategories>
          <StyledExpenseCardHeaderDate>
            {moment().format("ll")}
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

  return <div onClick={triggerCardActivation}>{cardElement}</div>;
};
