import styled from "styled-components";
import { H5 } from "../../../styles";

interface ProgressBarProps {
  background: string;
  color: string;
  completed: number;
}

type ProgressBarContainerProps = Pick<ProgressBarProps, "background">;
type ProgressBarFillerProps = Omit<ProgressBarProps, "color">;

export const ProgressBarWrapper = styled.div`
  margin: ${(props) => props.theme.space.xxl};
`;

export const ProgressBarContainer = styled.div<ProgressBarContainerProps>`
  display: flex;
  height: 20px;
  width: 100%;
  background-color: ${(props) => props.background};
  border-radius: ${(props) => props.theme.borderRadius.large};
`;

export const ProgressBarFiller = styled.div<ProgressBarFillerProps>`
  display: flex;
  height: "100%";
  width: ${(props) => props.completed}%;
  background-color: ${(props) => props.background};
  border-radius: "inherit";
  text-align: "right";
  transition: "width 1s ease-in-out";
  justify-content: flex-end;
  border-radius: ${(props) => props.theme.borderRadius.large};
`;

export const ProgressBarLabel = styled(H5)`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: ${(props) => props.theme.space.xxl};
  margin-top: ${(props) => props.theme.space.xl};
`;
