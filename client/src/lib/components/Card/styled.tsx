import styled from "styled-components";
import { mediaQueries, spaceUnit } from "../../../styles";

export const StyledCard = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.colors.componentBackground};
  box-shadow: ${(props) => props.theme.shadows.default};
  border-radius: ${(props) => props.theme.borderRadius.base};
  width: 100%;
  color: ${(props) => props.theme.colors.primaryDarkColor};
  @media ${mediaQueries.laptop} {
    min-width: 512px;
    height: auto;
    max-width: 900px;
  }
`;

export const StyledCardContent = styled.div`
  width: 100%;
  padding: ${spaceUnit * 3}px ${spaceUnit * 2}px;
`;
