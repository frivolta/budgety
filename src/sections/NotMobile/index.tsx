import React from "react";
import { Card, FullPageLayout } from "../../lib/components";
import { H1 } from "../../styles";
import { BiMobileVibration } from "react-icons/bi";
import { useTheme } from "styled-components";
import { Theme } from "../../styles/types";
import { NotMobileTextWrapper } from "./styled";
export const NotMobile = () => {
  const theme = useTheme() as Theme;
  return (
    <FullPageLayout>
      <Card>
        <NotMobileTextWrapper>
          <BiMobileVibration size="30%" color={theme.colors.primary} />
          <H1 weight="500">Budgety works on mobile devices only.</H1>
        </NotMobileTextWrapper>
      </Card>
    </FullPageLayout>
  );
};
