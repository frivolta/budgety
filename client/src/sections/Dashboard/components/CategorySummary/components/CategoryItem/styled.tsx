import styled from "styled-components";
import { H5 } from "../../../../../../styles";

interface CategoryItemColor {
  color: string;
}

export const CategoryItemWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const CategoryItemColor = styled.div<CategoryItemColor>`
  width: ${(props) => props.theme.space.l};
  height: ${(props) => props.theme.space.l};
  background-color: ${(props) => props.color};
  border-radius: ${(props) => props.theme.borderRadius.circle};
  margin-right: ${(props) => props.theme.space.xl};
`;

export const CategoryColorWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const CategoryItemName = styled(H5)`
  margin: 0;
  padding: 0;
`;
export const CategoryItemAmount = styled(H5)`
  margin: 0;
  padding: 0;
  font-weight: 500;
`;
