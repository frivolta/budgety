import styled from "styled-components";

export const StyledAccountSummaryInfoWrapper = styled.div`
  padding-top: ${(props) => props.theme.space.xl};
`;
export const StyledAccountSummaryInformation = styled.div`
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
  text-align: center;
`;

export const StyledAccountSummaryTagWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  width: 100%;
`;
