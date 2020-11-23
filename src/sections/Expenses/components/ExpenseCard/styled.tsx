import styled from "styled-components";
import { Amount, Description, ExpenseTag } from "../../../../styles";

interface StyledCategoryTextProps {
  categoryColor: string;
}

interface StyledBudgetText {
  color: string;
  background: string;
}

export const StyledExpenseCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 100%;
  overflow-x: hidden;
  padding: 16px;
`;

export const StyledExpenseCardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  flex-direction: row;
  margin-bottom: 16px;
`;

export const StyledExpenseCardBody = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 100%;
  overflow: hidden;
  flex-wrap: wrap;
  flex-direction: row;
`;

export const StyledExpenseCardHeaderCategories = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const StyledCategoryText = styled(ExpenseTag)<StyledCategoryTextProps>`
  color: ${({ categoryColor }) => categoryColor};
  background-color: ${({ categoryColor }) => categoryColor + "7f"};
  padding: 4px 8px;
  border-radius: ${(props) => props.theme.borderRadius.base};
`;
export const Exp = styled(ExpenseTag)<StyledCategoryTextProps>`
  color: ${({ categoryColor }) => categoryColor};
  background-color: ${({ categoryColor }) => categoryColor + "7f"};
  padding: 4px 8px;
  border-radius: ${(props) => props.theme.borderRadius.base};
`;

export const StyledBudgetText = styled(ExpenseTag)<StyledBudgetText>`
  padding: 4px 8px;
  color: ${(props) => props.color};
  background-color: ${(props) => props.background};
  margin-left: 16px;
  border-radius: ${(props) => props.theme.borderRadius.base};
`;

export const StyledExpenseCardHeaderDate = styled(ExpenseTag)`
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${(props) => props.theme.colors.lightText};
`;

export const StyledExpenseCardBodyDescription = styled(Description)`
  display: block;
  max-width: 55%;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  font-weight: normal;
  color: ${(props) =>
    props.color ? props.color : props.theme.colors.lightText};
`;
export const StyledExpenseCardBodyAmount = styled(Amount)`
  display: block;
  max-width: 40%;
  font-weight: bold;
  color: ${(props) =>
    props.color ? props.color : props.theme.colors.lightText};
`;
