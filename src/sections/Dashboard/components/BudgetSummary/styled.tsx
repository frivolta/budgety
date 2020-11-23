import styled from "styled-components";

export const MonthlyBudgetWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: ${(props) => props.theme.space.s};
  margin-right: ${(props) => props.theme.space.s};
  margin-top: ${(props) => props.theme.space.xxl};
`;
