import React from "react";
import { FooterDesktop, FooterMobile } from "./components";
import { FooterContainer, FooterWrapper } from "./styled";

export const Footer = () => {
  return (
    <FooterContainer>
      <FooterWrapper>
        <FooterDesktop />
        <FooterMobile />
      </FooterWrapper>
    </FooterContainer>
  );
};
