import React from "react";
import { Button, Card } from "../../../../lib/components";
import {
  StyledBudgetInformation,
  StyledBudgetViewContainer,
  StyledBudgetViewImage,
  StyledBudgetViewWrapper,
  StyledUserBudgetInfoWrapper,
} from "./styled";
import { H3, H5, Text } from "../../../../styles";
import userBudgetImage from "./assets/images/budget.svg";
import { useUserBudget } from "../../../../lib/hooks/useUserBudget";

export const BudgetView = () => {
  const { userBudget, loading: loadingUserBudget } = useUserBudget();
  const introElement = (
    <StyledBudgetViewWrapper>
      <Card height="auto">
        <StyledBudgetViewContainer>
          <StyledBudgetViewImage src={userBudgetImage} alt="user budget" />
          <Text>Default budget follow the 50/30/20 pattern</Text>
        </StyledBudgetViewContainer>
      </Card>
    </StyledBudgetViewWrapper>
  );

  const userBudgetInfo =
    !loadingUserBudget && userBudget ? (
      <StyledUserBudgetInfoWrapper>
        <H3>Budget informations</H3>
        <Card height="auto">
          <StyledBudgetInformation>
            <H5>Needs</H5>
            <Text>{userBudget.needs}%</Text>
          </StyledBudgetInformation>
          <StyledBudgetInformation>
            <H5>Wants</H5>
            <Text>{userBudget.wants}%</Text>
          </StyledBudgetInformation>
          <StyledBudgetInformation>
            <H5>Savings</H5>
            <Text>{userBudget.savings}%</Text>
          </StyledBudgetInformation>
          <Button
            text="Edit Budget"
            handleClick={() => console.log("want to edit budget")}
            disabled
          />
        </Card>
      </StyledUserBudgetInfoWrapper>
    ) : null;

  return (
    <StyledBudgetViewWrapper>
      {introElement}
      {userBudgetInfo}
    </StyledBudgetViewWrapper>
  );
};
