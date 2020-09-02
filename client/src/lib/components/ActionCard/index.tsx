import React from "react";
import { H4, H6 } from "../../../styles/Theme/typography";
import editIcon from "./assets/images/edit.svg";
import { ActionCardAction, ActionCardText, ActionCardWrapper } from "./styled";
import { Icon } from "../CustomIcon";
import { theme } from "../../../styles/Theme/index";

// @Test ( Unit )
// - User can insert action, title text and it is displayed correctly

interface Props {
  title: string;
  text: string;
  action: () => void;
}

export const ActionCard: React.FC<Props> = ({ title, text, action }) => {
  return (
    <ActionCardWrapper>
      <ActionCardText>
        <H6>{title}</H6>
        <H4 color={theme.colors.darkPrimary}>{text}</H4>
      </ActionCardText>
      <ActionCardAction>
        <Icon icon={editIcon} alt="Edit" shadow onClick={action} />
      </ActionCardAction>
    </ActionCardWrapper>
  );
};
