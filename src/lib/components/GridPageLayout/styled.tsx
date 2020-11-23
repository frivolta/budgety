import styled from "styled-components/macro";
import { Header } from "../Header";
import { Footer } from "../Footer";
import { mediaQueries, headerHeight, footerHeight } from "../../../styles";

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
    display: block;
    flex-direction: column;
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
  background-color: ${(props) => props.theme.pageBackground};
  padding: 0 ${(props) => props.theme.space.xl};
  margin-bottom: ${footerHeight * 1.5}px;
`;
export const GridFooter = styled(Footer)`
  grid-area: footer;
`;
