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
  @media ${mediaQueries.tabletMax} {
    grid-template-areas: "header" "main" "footer";
    grid-template-columns: 1fr;
    min-height: 100vh;
    height: auto;
  }
`;

export const GridHeader = styled(Header)`
  grid-area: header;
`;

export const GridMain = styled.div`
  grid-area: main;
  background-color: ${(props) => props.theme.pageBackground};
`;
export const GridFooter = styled(Footer)`
  grid-area: footer;
`;
