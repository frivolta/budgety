import React, { FC } from "react";
import { Card, CustomSmallButton } from "../../../../lib/components";
import { StyledAvatarContainer } from "./styled";
import Avatar from "react-avatar";
import { H4 } from "../../../../styles/Theme/typography";
import { theme } from "../../../../styles/Theme/index";
import { LoadingScreen } from "../../../../lib/components/LoadingScreen/index";

interface Props {
  isLoading: boolean;
  userEmail: string;
  handleLogOut: () => void;
}

export const UserGeneralInfo: FC<Props> = ({
  isLoading,
  userEmail,
  handleLogOut,
}) => {
  const userGeneralInfoElement = () => {
    return isLoading ? (
      <LoadingScreen loadingText="Loading avatar..." />
    ) : (
      <>
        <StyledAvatarContainer>
          <Avatar name={userEmail} size="150" round />
        </StyledAvatarContainer>
        <H4 color={theme.colors.darkPrimary}>{userEmail}</H4>
        <CustomSmallButton text="Logout" handleClick={handleLogOut} />
      </>
    );
  };

  return <Card>{userGeneralInfoElement()}</Card>;
};
