import React from "react";
import { FooterDesktop } from "./components";
import { FooterMobile } from "./components/FooterMobile";
import { FooterContainer, FooterWrapper } from "./styled";

export const Footer = () => {
  return (
    <FooterContainer>
      <FooterDesktop />
      <FooterMobile />
    </FooterContainer>
  );
};
