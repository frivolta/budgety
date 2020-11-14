import React from "react";
import { Button } from "..";
import { useSingleExpenseModalValue } from "../../context";
import { ModalActions, ModalContainer, ModalWrapper } from "./styled";

export const Modal = () => {
  const { setIsModalOpen } = useSingleExpenseModalValue();
  const handleReturnToExpenses = () => {
    setIsModalOpen(false);
  };

  return (
    <ModalWrapper>
      <ModalContainer>
        <ModalActions>
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
        </ModalActions>
      </ModalContainer>
    </ModalWrapper>
  );
};
