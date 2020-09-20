import React from "react";
import { defaultTheme, H1 } from "../../../../../styles";
import {
  HeaderMobileTitle,
  HeaderMobileIcons,
  HeaderMobileContainer,
} from "./styled";
import { IoMdSwitch } from "react-icons/io";
import { Link } from "react-router-dom";

interface Props {
  sectionName: string;
}

export const HeaderMobile = ({ sectionName }: Props) => {
  return (
    <HeaderMobileContainer>
      <HeaderMobileTitle>
        <H1>{sectionName}</H1>
      </HeaderMobileTitle>
      <HeaderMobileIcons>
        <Link to="/settings" data-testid="HeaderMobileSettings">
          <IoMdSwitch size={32} color={defaultTheme.colors.primaryColor} />
        </Link>
      </HeaderMobileIcons>
    </HeaderMobileContainer>
  );
};
