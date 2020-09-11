import styled from "styled-components";

export const FullPageContent = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
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
  background-color: ${(props) => props.theme.colors.pageBackground};
`;
