import React, { useState } from "react";
import { useTheme } from "styled-components";
import { Card } from "../../../../lib/components";
import { H3, H5 } from "../../../../styles";
import { Theme } from "../../../../styles/types";
import { Expense, UserProfile } from "../../../../types";
import {
  StyledMonthlySummaryInformation,
  StyledMonthlySummaryInfoWrapper,
} from "./styled";

interface Props {
  expenses: Expense[];
}

export const MonthlySummary = ({ expenses }: Props) => {
  const [accountAmount, setAccountAmount] = useState<number>(0);
  const theme = useTheme() as Theme;

  return (
    <StyledMonthlySummaryInfoWrapper>
      <Card height="auto" margin={theme.space.s}>
        <StyledMonthlySummaryInformation>
          <H5>Incomes</H5>
          <H3 weight="500"></H3>
        </StyledMonthlySummaryInformation>
      </Card>
      <Card height="auto" margin={theme.space.s}>
        <StyledMonthlySummaryInformation>
          <H5>Expenses</H5>
          <H3 weight="500"></H3>
        </StyledMonthlySummaryInformation>
      </Card>
    </StyledMonthlySummaryInfoWrapper>
  );
};
