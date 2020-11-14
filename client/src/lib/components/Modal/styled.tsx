import styled from "styled-components";

export const ModalWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
  background-color: ${(props) => props.theme.colors.componentBackground};
`;

export const ModalContainer = styled.div`
  display: flex;
  padding: ${(props) => props.theme.space.max};
  width: 100%;
  justify-content: center;
  align-items: center;
`;

export const ModalActions = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
