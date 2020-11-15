import React, { useState } from "react";
import { useTheme } from "styled-components/macro";
import { Button, LoadingScreen } from "..";
import { Theme } from "../../../styles/types";
import { Expense } from "../../../types";
import { deleteExpense } from "../../api/queries";
import useAuthContext from "../../auth/useAuthContext";
import {
  useSingleExpenseModalValue,
  useSingleExpenseValue,
} from "../../context";
import { DELETE_EXPENSE_ERROR, DELETE_EXPENSE_SUCCESS } from "../../messages";
import { getBudgetTypeById } from "../../utils/categories";
import { formatDateFromTimestamp, formatPrice } from "../../utils/format";
import { toasterError, toasterSuccess } from "../../utils/toaster";
import {
  SingleExpenseActions,
  SingleExpenseAmount,
  ModalContainer,
  ModalWrapper,
  SingleExpenseDate,
  SingleExpenseDescription,
  SingleExpenseTagContainer,
  SingleExpenseTagElement,
} from "./styled";

export const Modal = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { setIsModalOpen } = useSingleExpenseModalValue();
  const { expense, setExpense } = useSingleExpenseValue();
  const [currentUser] = useAuthContext();
  const theme = useTheme() as Theme;
  const {
    needs,
    needsBackground,
    wants,
    wantsBackground,
    incomes,
    incomesBackground,
  } = theme.colors;

  const handleReturnToExpenses = () => {
    setIsModalOpen(false);
    setExpense(null);
  };
  const handleDeleteExpense = async (expense: Expense) => {
    if (currentUser && expense.id) {
      try {
        setIsLoading(true);
        await deleteExpense(currentUser.uid, expense.id);
        toasterSuccess(DELETE_EXPENSE_SUCCESS.expenseDeleted);
        handleReturnToExpenses();
      } catch (error) {
        toasterError(DELETE_EXPENSE_ERROR.genericError);
        console.error("[err]: Error deleting expense: ", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  console.log(expense);
  const defineBudgetColor = (expense: Expense) => {
    switch (expense.categoryType) {
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

  if (!expense) {
    return <LoadingScreen loadingText="Loading expense..." />;
  }

  return (
    <ModalWrapper>
      <ModalContainer>
        <SingleExpenseTagContainer>
          <SingleExpenseTagElement
            color={defineBudgetColor(expense).color}
            background={defineBudgetColor(expense).backgroundColor}
          >
            {getBudgetTypeById(expense.categoryType)?.caption}:{" "}
            {expense.category}
          </SingleExpenseTagElement>
        </SingleExpenseTagContainer>
        <SingleExpenseAmount>
          {expense.expenseType === 1 ? "-" : "+"}
          {formatPrice(expense.amount)}
        </SingleExpenseAmount>
        <SingleExpenseDate>
          {formatDateFromTimestamp(expense.date, true)}
        </SingleExpenseDate>
        <SingleExpenseDescription>
          {expense.description}
        </SingleExpenseDescription>
        <SingleExpenseActions>
          <Button
            text="Delete expense"
            handleClick={() => handleDeleteExpense(expense)}
            isLoading={false}
            disabled={isLoading}
          />
          <Button
            secondary
            text="Go back"
            handleClick={handleReturnToExpenses}
            isLoading={false}
            disabled={isLoading}
          />
        </SingleExpenseActions>
      </ModalContainer>
    </ModalWrapper>
  );
};
