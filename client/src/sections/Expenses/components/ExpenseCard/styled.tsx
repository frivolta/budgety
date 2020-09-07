import styled from "styled-components";
import { theme } from "../../../../styles/Theme";

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
  margin: 0 0 16px 0;
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
  alignitems: center;
`;
export const StyledExpenseCardHeaderDate = styled.div`
  display: flex;
  justify-content: center;
  alignitems: center;
`;
export const StyledExpenseCardBodyDescription = styled.div`
  display: block;
  max-width: 60%;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  font-size: 14px;
  font-weight: regular;
  color: ${(props) => (props.color ? props.color : theme.colors.darkPrimary)};
`;
export const StyledExpenseCardBodyAmount = styled.div`
  display: block;
  max-width: 40%;
  font-size: 18px;
  font-weight: bold;
  color: ${(props) => (props.color ? props.color : theme.colors.darkPrimary)};
`;
