import styled from "styled-components";
import { H2, H6, Text } from "../../../../styles";

interface SingleExpenseTagElementProps {
  color: string;
  background: string;
}

export const SingleExpenseActions = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: ${(props) => props.theme.space.xxl};
`;

export const SingleExpenseAmount = styled(H2)``;
export const SingleExpenseDate = styled(H6)`
  margin: 0;
  padding: 0;
`;
export const SingleExpenseTagContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-transform: uppercase;
`;
export const SingleExpenseTagElement = styled.div<SingleExpenseTagElementProps>`
  background-color: ${(props) => props.background};
  color: ${(props) => props.color};
  padding: ${(props) => props.theme.space.m} ${(props) => props.theme.space.l};
  border-radius: ${(props) => props.theme.borderRadius.base};
  font-weight: 700;
`;
export const SingleExpenseDescription = styled(Text)``;
