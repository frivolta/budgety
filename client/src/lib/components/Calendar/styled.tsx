import styled, { css } from "styled-components";

interface StyledDayProps {
  isToday?: boolean;
  isSelected?: boolean;
}

export const StyledFrame = styled.div`
  width: 400px;
  border: 1px solid lightgrey;
  box-shadow: 2px 2px 2px #eee;
`;

export const StyledHeader = styled.div`
  font-size: 18px;
  font-weight: bold;
  padding: 10px 10px 5px 10px;
  display: flex;
  justify-content: space-between;
  background-color: #f5f6fa;
`;

export const StyledButton = styled.div`
  cursor: pointer;
`;

export const StyledBody = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
`;

export const StyledDay = styled.div<StyledDayProps>`
  width: 14.2%;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  ${(props) =>
    props.isToday &&
    css`
      border: 1px solid #eee;
    `}

  ${(props) =>
    props.isSelected &&
    css`
      background-color: #eee;
    `}
`;
