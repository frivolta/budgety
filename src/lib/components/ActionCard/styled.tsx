import styled from "styled-components/macro";
import { H5, typeScale } from "../../../styles";

interface ActionCardProps {
  type: number;
}

export const ActionCardWrapper = styled.div`
  display: flex;
  width: 100%;
  padding: ${(props) => props.theme.space.m};
`;
export const ActionCardContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.colors.componentBackground};
  padding: ${(props) => props.theme.space.xxl};
  transition: background-color 0.3s;
  :hover {
    background-color: ${(props) => props.theme.colors.componentHover};
    cursor: pointer;
    transition: background-color 0.3s;
  }
`;

export const ActionCardTag = styled.span<ActionCardProps>`
  color: ${(props) =>
    props.type === 1
      ? props.theme.colors.needs
      : props.type === 2
      ? props.theme.colors.wants
      : props.theme.colors.incomes};
  background-color: ${(props) =>
    props.type === 1
      ? props.theme.colors.needsBackground
      : props.type === 2
      ? props.theme.colors.wantsBackground
      : props.theme.colors.incomesBackground};
  padding: ${(props) => props.theme.space.s} ${(props) => props.theme.space.l};
  text-transform: uppercase;
  font-size: ${typeScale.helperText};
  font-weight: 700;
  border-radius: ${(props) => props.theme.borderRadius.base};
`;

export const ActionCardName = styled(H5)`
  margin: ${(props) => props.theme.space.xxl} 0 0 0;
`;
