import styled from "styled-components";
import { typeScale } from "../../../styles";

interface ActionCardWrapperProps {
  color: string;
}

export const ActionCardWrapper = styled.div<ActionCardWrapperProps>`
  width: 100%;
  background-color: ${(props) => props.color};
  border-radius: ${(props) => props.theme.borderRadius.base};
  padding: ${(props) => props.theme.space.xl};
  margin: ${(props) => props.theme.space.xl} 0;
  color: ${(props) => props.theme.colors.textColorInverted};
  box-shadow: ${(props) => props.theme.shadows.default};
  display: flex;
  justify-content: center;
  align-items: left;
  flex-direction: column;
  cursor: pointer;
`;

export const ActionCardTitle = styled.div`
  display: flex;
  text-transform: uppercase;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: left;
  overflow: hidden;
  font-size: ${typeScale.helperText};
  font-weight: bold;
  color: ${(props) => props.theme.colors.invertedColor};
  width: 100%;
  padding-bottom: ${(props) => props.theme.space.m};
`;
