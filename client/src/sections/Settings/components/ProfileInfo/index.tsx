import React from "react";
import { auth } from "../../../../lib/api/firebase";
import useAuthContext from "../../../../lib/auth/useAuthContext";
import { Button, Card } from "../../../../lib/components";
import { H3, H5, H6, Text } from "../../../../styles";
import userProfileImage from "./assets/images/user-profile.svg";
import {
  StyledProfileInfoWrapper,
  StyledProfileInfoImage,
  StyledProfileInfoContainer,
} from "./index.styled";

export const ProfileInfo = () => {
  const [currentUser, isLoadingCurrentUser] = useAuthContext();

  const handleLogout = () => {
    auth.signOut();
  };

  const cardContentElement =
    !isLoadingCurrentUser && currentUser?.email ? (
      <StyledProfileInfoContainer>
        <StyledProfileInfoImage src={userProfileImage} alt="profile email" />
        <Text>{currentUser.email}</Text>
        <Button text="Log out" handleClick={handleLogout} />
      </StyledProfileInfoContainer>
    ) : (
      <H6>Loading your profile...</H6>
    );

  return (
    <StyledProfileInfoWrapper>
      <H3>Your Profile</H3>
      <Card height="auto">{cardContentElement}</Card>
    </StyledProfileInfoWrapper>
  );
};
