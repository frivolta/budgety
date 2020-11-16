import styled from "styled-components";
import { H2, H3 } from "../../../styles";

interface MonthsTagProps {
  isActive?: boolean;
}

export const MonthSelectorWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: ${(props) => props.theme.space.xxl};
`;

export const MonthSelectorMonthsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

export const MonthSelectorMonthsTag = styled.div<MonthsTagProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: ${(props) => (props.isActive ? "default" : "pointer")};
  flex: 1;
  opacity: ${(props) => (props.isActive ? 1 : 0.4)};
  padding: ${(props) => props.theme.space.m} ${(props) => props.theme.space.s};
  transition: all 0.3s;
  :hover {
    opacity: 1;
    transition: all 0.3s;
  }
`;

export const MonthsTag = styled(H3)`
  margin: 0;
  padding: 0;
  color: ${(props) => props.theme.colors.primary};
`;

export const ArrowButton = styled.button`
  appearance: none;
  background-color: ${(props) => props.theme.colors.primary};
  box-shadow: ${(props) => props.theme.shadows.default};
  color: ${(props) => props.theme.colors.lightText};
  outline: 0;
  border: none;
  border-radius: ${(props) => props.theme.borderRadius.base};
`;
