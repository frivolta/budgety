import styled from "styled-components";

export const AccountSummaryInfoWrapper = styled.div`
  padding-top: ${(props) => props.theme.space.xl};
`;
export const AccountSummaryInformation = styled.div`
  padding-top: ${(props) => props.theme.space.s};
  padding-bottom: ${(props) => props.theme.space.xl};
  border-top: 1px solid ${(props) => props.theme.colors.border};
  :first-child {
    border-top: none;
    padding-top: 0;
  }
  :last-child {
    padding-bottom: 0;
  }
`;
