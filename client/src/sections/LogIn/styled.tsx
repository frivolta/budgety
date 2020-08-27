import styled from "styled-components";
import { device } from "../../styles/Theme/costants";

export const LogInCard = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;
  background-color: ${(props) => props.theme.colors.lightPrimary};
  box-shadow: 2px 0px 15px rgba(0, 0, 0, 0.05);
  border-radius: ${(props) => props.theme.misc.borderRadius};
  min-width: 150px;
  min-height: 150px;
  width: 100%;
  height: 100%;
  max-width: 100%;
  overflow-x: hidden;
  font-family: ${(props) => props.theme.fonts[1]};
  @media ${device.laptop} {
    width: 512px;
    height: auto;
    max-width: 900px;
  }
`;
export const LogInCardContent = styled.div`
  width: 100%;
  padding: 48px 32px;
  h1 {
    padding-bottom: 24px;
  }
`;
