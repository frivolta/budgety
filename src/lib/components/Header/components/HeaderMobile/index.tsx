import React from "react";
import { useTheme } from "styled-components";
import { H1 } from "../../../../../styles";
import {
  HeaderMobileTitle,
  HeaderMobileIcons,
  HeaderMobileContainer,
} from "./styled";
import { IoMdSwitch } from "react-icons/io";
import { Link } from "react-router-dom";
import { Theme } from "react-select/src/types";

interface Props {
  sectionName: string;
}

export const HeaderMobile = ({ sectionName }: Props) => {
  const theme = useTheme() as Theme;

  return (
    <HeaderMobileContainer>
      <HeaderMobileTitle>
        <H1>{sectionName}</H1>
      </HeaderMobileTitle>
      <HeaderMobileIcons>
        <Link to="/settings" data-testid="HeaderMobileSettings">
          <IoMdSwitch size={32} color={theme.colors.primary} />
        </Link>
      </HeaderMobileIcons>
    </HeaderMobileContainer>
  );
};
