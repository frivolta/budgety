import styled from "styled-components";
import { mediaQueries, spaceUnit } from "../../../styles";

interface StyledCardProps {
  height?: string;
  margin?: string;
}

interface StyledCardContentProps {
  size?: "small" | "regular";
}

export const StyledCard = styled.div<StyledCardProps>`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: ${(props) => (props.margin ? props.margin : "0")};
  background-color: ${(props) => props.theme.colors.componentBackground};
  box-shadow: ${(props) => props.theme.shadows.default};
  border-radius: ${(props) => props.theme.borderRadius.base};
  width: 100%;
  height: ${(props) => (props.height ? props.height : "100%")};
  color: ${(props) => props.theme.colors.lightText};
  @media ${mediaQueries.tablet} {
    min-width: 512px;
    height: auto;
    max-width: 900px;
  }
`;

const smallCardContentSize = `${(spaceUnit / 4) * 1}px ${
  (spaceUnit / 4) * 2
}px;`;
const regularCardContentSize = `${spaceUnit * 1}px ${spaceUnit * 2}px;`;

export const StyledCardContent = styled.div<StyledCardContentProps>`
  width: 100%;
  padding: ${(props) =>
    props.size === "small" ? smallCardContentSize : regularCardContentSize};
`;
