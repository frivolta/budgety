import styled from "styled-components/macro";
import { Text } from "../../../styles";

export const StyledErrorCardWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  background-color: ${(props) => props.theme.colors.errorBackground};
  padding: ${(props) => props.theme.space.l};
  margin: ${(props) => props.theme.space.xxl} 0;
  border-radius: ${(props) => props.theme.borderRadius.base};
`;

export const StyledErrorCardText = styled(Text)`
  color: ${(props) => props.theme.colors.error};
`;
