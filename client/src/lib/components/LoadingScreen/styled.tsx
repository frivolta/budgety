import styled from "styled-components";
interface Props {
  inPageLoader?: boolean;
}
export const StyledLoadingContainer = styled.div<Props>`
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: ${({ inPageLoader }) => (inPageLoader ? "auto" : "100vh")};
  background-color: ${(props) => props.theme.colors.background};
  color: ${(props) => props.theme.colors.lightText};
`;
