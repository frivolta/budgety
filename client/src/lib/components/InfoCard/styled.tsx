import styled from "styled-components";
import { typeScale } from "../../../styles";

export const InfoCardWrapper = styled.div`
  width: 100%;
  background-color: ${(props) => props.theme.colors.secondaryColor};
  border-radius: ${(props) => props.theme.borderRadius.base};
  padding: ${(props) => props.theme.space.xl};
  color: ${(props) => props.theme.colors.textColorInverted};
  box-shadow: ${(props) => props.theme.shadows.small};
  display: flex;
  justify-content: center;
  align-items: space-between;
  flex-direction: column;
`;

export const InfoCardTitle = styled.div`
  font-size: ${typeScale.helperText};
  font-weight: bold;
  color: ${(props) => props.theme.colors.invertedColor};
  width: 100%;
  padding-bottom: ${(props) => props.theme.space.m};
  text-transform: uppercase;
`;
