import styled, { css } from "styled-components";

interface StyledDayProps {
  isToday: boolean;
  isSelected: boolean;
  isTrueDay?: boolean;
  isWeekDay?: boolean;
}

interface StyledButtonProps {
  isNavigation?: boolean;
}

export const StyledFrame = styled.div`
  width: 100%;
  border: none;
  margin: ${(props) => props.theme.space.xl} 0;
`;

export const StyledHeader = styled.div`
  padding: ${(props) => props.theme.space.xl} ${(props) => props.theme.space.xl};
  display: flex;
  justify-content: space-between;
  background-color: ${(props) => props.theme.colors.primary};
  border-radius: ${(props) => props.theme.borderRadius.base};
  font-weight: ${(props) => props.theme.fonts.header.weight};
  font-size: ${(props) => props.theme.fonts.header.size};
  box-shadow: ${(props) => props.theme.shadows.default};
`;

export const StyledButton = styled.div<StyledButtonProps>`
  cursor: pointer;
  font-size: ${(props) =>
    props.isNavigation
      ? props.theme.fonts.small.size
      : props.theme.fonts.default.size};
`;

export const StyledBody = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  margin: ${(props) => props.theme.space.l} 0;
`;

export const StyledDay = styled.div<StyledDayProps>`
  width: 14.2%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding: ${(props) => props.theme.space.l} ${(props) => props.theme.space.s};
  border-radius: ${(props) => props.theme.borderRadius.base};
  transition: all 0.3s linear;
  cursor: inherit;
  ${(props) =>
    props.isToday &&
    css`
      border: 1px solid ${(props) => props.theme.colors.primary};
    `}
  ${(props) =>
    props.isTrueDay &&
    css`
      cursor: pointer;
      &:hover {
        background-color: ${(props) => props.theme.colors.componentHover};
        transition: all 0.3s linear;
      }
    `}
  ${(props) =>
    props.isSelected &&
    css`
      background-color: ${(props) => props.theme.colors.componentHover};
    `}
    ${(props) =>
    props.isWeekDay &&
    css`
      font-weight: ${(props) => props.theme.fonts.default.tertiaryWeight};
    `}
`;
