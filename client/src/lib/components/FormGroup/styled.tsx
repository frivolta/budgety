import styled from "styled-components";

export const StyledFormGroup = styled.div`
  margin-top: ${(props) => props.theme.space.xl};
  :first-child {
    margin-top: 0;
  }
`;
