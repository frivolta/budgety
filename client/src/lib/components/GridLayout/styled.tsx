import styled from "styled-components";
import { device } from "../../../styles/Theme/costants";

interface DashboardSidenavContainerProps {
  isActive: boolean;
}

export const Grid = styled.div`
  display: grid;
  grid-template-columns: 260px 1fr;
  grid-template-rows: ${(props) => props.theme.misc.headerHeight} 1fr 50px;
  grid-template-areas: "header header" "sidenav main" "sidenav footer";
  height: 100vh;
  background-color: ${(props) => props.theme.colors.background};
  @media ${device.tabletMax} {
    grid-template-columns: 1fr;
    min-height: 100vh;
    height: auto;
    grid-template-areas: "header" "main" "footer";
  }
`;
export const DashboardMainContainer = styled.div`
  grid-area: main;
  background-color: ${(props) => props.theme.colors.lightSecondary};
  padding: 0 36px;
`;

export const DashboardHeaderContainer = styled.div`
  display: flex;
  grid-area: header;
  align-items: center;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background: ${(props) => props.theme.colors.lightPrimary};
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
  z-index: 2;
  @media ${device.tabletMax} {
    position: fixed;
    width: 100%;
    height: 72px;
    padding: 0 32px;
    background: ${(props) => props.theme.colors.lightSecondary};
    box-shadow: none;
  }
`;
export const DashboardMobileNavigation = styled.div`
  grid-area: footer;
  align-items: center;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  display: none;
  padding: 0 36px;
  @media ${device.tabletMax} {
    background: ${(props) => props.theme.colors.lightPrimary};
    box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
    z-index: 2;
    display: flex;
    position: fixed;
    width: 100%;
    height: 72px;
    bottom: 0;
  }
`;

export const DashboardFooterContainer = styled.div`
  grid-area: footer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 32px;
  background-color: $lightSecondary;
  @media ${device.tabletMax} {
    height: 72px;
  }
`;

export const DashboardSidenavContainer = styled.div<
  DashboardSidenavContainerProps
>`
  grid-area: sidenav;
  padding-top: ${(props) => props.theme.misc.headerHeight};
  transition: all 0.4s ease-in-out;
  background: ${(props) => props.theme.colors.lightPrimary};
  display: flex;
  box-shadow: 10px 0px 10px rgba(0, 0, 0, 0.05);
  @media ${device.tabletMax} {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 2;
    width: 100%;
    max-width: 100%;
    bottom: 0;
    transform: ${(props) =>
      props.isActive ? `transform: translate(0, 0);` : `translate(-100%, 0)`};
  }
`;

export const DashboardSidenavTitle = styled.div`
  margin-top: 3rem;
  margin-bottom: 16px;
  margin-left: 32px;
  margin-right: 32px;
`;

export const DashboardSidenavHr = styled.hr`
  border-top: 1px solid ${(props) => props.theme.colors.darkSecondary};
  margin-left: 32px;
  margin-right: 32px;
`;
