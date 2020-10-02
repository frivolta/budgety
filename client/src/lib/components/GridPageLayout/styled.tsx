import styled from "styled-components";
import { Header } from "../Header";
import { Footer } from "../Footer";
import { mediaQueries, headerHeight } from "../../../styles";

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: ${headerHeight}px 1fr 50px;
  grid-template-areas: "header" "main" "footer";
  height: 100vh;
  overflow: hidden;
  width: 100%;
  background-color: ${(props) => props.theme.colors.background};
  @media ${mediaQueries.tabletMax} {
    grid-template-areas: "header" "main" "footer";
    grid-template-columns: 1fr;
    min-height: 100vh;
    max-width: 100%;
    height: auto;
  }
`;

export const GridHeader = styled(Header)`
  grid-area: header;
`;

export const GridMain = styled.div`
  grid-area: main;
  background-color: ${(props) => props.theme.background};
  padding: ${(props) => props.theme.space.xl};
`;
export const GridFooter = styled(Footer)`
  grid-area: footer;
`;
