import React from "react";
import { useTheme } from "styled-components/macro";
import { Button } from "..";
import { Theme } from "../../../styles/types";
import { Expense } from "../../../types";
import {
  useSingleExpenseModalValue,
  useSingleExpenseValue,
} from "../../context";
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
  const { setIsModalOpen } = useSingleExpenseModalValue();
  const { setExpense } = useSingleExpenseValue();
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

  return (
    <ModalWrapper>
      <ModalContainer>
        <SingleExpenseTagContainer>
          <SingleExpenseTagElement color={wants} background={wantsBackground}>
            NEEDS: Category
          </SingleExpenseTagElement>
        </SingleExpenseTagContainer>
        <SingleExpenseAmount>-150,00 €</SingleExpenseAmount>
        <SingleExpenseDate>WEDNESDAY 15 NOVEMBER 2020</SingleExpenseDate>
        <SingleExpenseDescription>Expense Description</SingleExpenseDescription>
        <SingleExpenseActions>
          <Button
            text="Delete expense"
            handleClick={handleReturnToExpenses}
            isLoading={false}
            disabled={false}
          />
          <Button
            secondary
            text="Return to expenses"
            handleClick={handleReturnToExpenses}
            isLoading={false}
            disabled={false}
          />
        </SingleExpenseActions>
      </ModalContainer>
    </ModalWrapper>
  );
};
