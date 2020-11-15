import React from "react";

import { ModalContainer, ModalWrapper } from "./styled";

interface Props {
  children: React.ReactNode;
}

export const Modal = ({ children }: Props) => {
  return (
    <ModalWrapper>
      <ModalContainer>{children}</ModalContainer>
    </ModalWrapper>
  );
};
