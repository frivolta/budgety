import styled from "styled-components/macro";
import { Text } from "../../../styles";

export const StyledIntroDescriptionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const StyledIntroDescriptionText = styled(Text)`
  color: ${(props) => props.theme.colors.text};
  text-align: center;
`;
export const StyledIntroDescriptionImage = styled.img`
  margin: ${(props) => props.theme.space.xl};
`;
