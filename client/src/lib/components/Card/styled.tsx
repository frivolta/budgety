import styled from "styled-components";
import { device } from "../../../styles/Theme/costants";

interface CardProps {
  customWidth?: number;
  customHeight?: number;
  hoverable?: boolean;
}

export const StyledCard = styled.div<CardProps>`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: auto;
  background-color: ${(props) => props.theme.colors.lightPrimary};

  box-shadow: 2px 0px 15px rgba(0, 0, 0, 0.05);
  border-radius: ${(props) => props.theme.misc.borderRadius};
  width: 100%;
  max-width: 100%;
  overflow-x: hidden;
  padding-top: 18px;
  padding-bottom: 18px;
  padding-left: 18px;
  padding-right: 18px;
  margin-top: 36px;
  margin-bottom: 36px;
  font-family: ${(props) => props.theme.fonts[1]};
  transition: all 0.3s;
  :hover {
    transition: all 0.3s;
    cursor: ${(props) => props.hoverable && "pointer"};
    box-shadow: ${(props) =>
      props.hoverable && "2px 0px 15px rgba(0, 0, 0, 0.2)"};
  }
  @media ${device.laptop} {
    width: ${(props) =>
      props.customWidth ? `${props.customWidth}%` : "512px"};
    height: ${(props) =>
      props.customHeight ? `${props.customHeight}px` : "auto"};
    max-width: 900px;
  }
`;
