import styled from "styled-components";

export const StyledBudgetViewWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
`;
export const StyledUserBudgetInfoWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin-top: ${(props) => props.theme.space.xl};
`;
export const StyledBudgetViewContainer = styled.div`
  text-align: center;
`;
export const StyledBudgetViewImage = styled.img`
  max-width: 100%;
`;
export const StyledBudgetInformation = styled.div`
  padding-top: ${(props) => props.theme.space.s};
  padding-bottom: ${(props) => props.theme.space.xl};
  border-top: 1px solid ${(props) => props.theme.colors.borderColor};
  :first-child {
    border-top: none;
    padding-top: 0;
  }
  :last-child {
    padding-bottom: 0;
  }
`;
