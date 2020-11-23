import styled from "styled-components";

export const StyledMonthlySummaryInfoWrapper = styled.div`
  margin-top: ${(props) => props.theme.space.xl};
  display: flex;
  width: 100%;
  flex-wrap: nowrap;
`;
export const StyledMonthlySummaryInformation = styled.div`
  padding-top: ${(props) => props.theme.space.s};
  padding-bottom: ${(props) => props.theme.space.xl};
  margin: ${(props) => props.theme.space.s};
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
