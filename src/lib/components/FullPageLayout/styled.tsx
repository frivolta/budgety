import styled from "styled-components";
import { mediaQueries } from "../../../styles";

export const FullPageContent = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  @media ${mediaQueries.tabletMax} {
    width: 100%;
    height: 100%;
  }
`;

export const FullPageWrapper = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  bottom: 0;
  left: 0;
  right: 0;
  top: 0;
  justify-content: center;
  align-items: center;
  overflow-y: auto;
  transition: all 0.15s ease-in;
  z-index: 1000;
  background-color: ${(props) => props.theme.colors.background};
`;
