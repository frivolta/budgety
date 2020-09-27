import React from "react";
import { Button, Card } from "../../../../lib/components";
import { useUserProfile } from "../../../../lib/hooks/useUserProfile";
import { formatPrice } from "../../../../lib/utils/format";
import { H3, H5, Text } from "../../../../styles";
import { StyledUserInfoInformation, StyledUserInfoWrapper } from "./styled";

interface Props {
  handleEditSettingsClick: () => void;
}

export const UserInfo = ({ handleEditSettingsClick }: Props) => {
  const { userProfile, loading: userProfileIsLoading } = useUserProfile();

  const userProfileElement =
    !userProfileIsLoading && userProfile ? (
      <>
        <H3>Account informations</H3>
        <Card height="auto">
          <StyledUserInfoInformation>
            <H5>Account name</H5>
            <Text>{userProfile.accountName}</Text>
          </StyledUserInfoInformation>
          <StyledUserInfoInformation>
            <H5>Starting Balance</H5>
            <Text>{formatPrice(userProfile.startingBalance)}</Text>
          </StyledUserInfoInformation>
          <StyledUserInfoInformation>
            <H5>Monthly Budget</H5>
            <Text>{formatPrice(userProfile.monthlyBudget)}</Text>
          </StyledUserInfoInformation>
          <Button handleClick={handleEditSettingsClick} text="Edit settings" />
        </Card>
      </>
    ) : null;

  return (
    <StyledUserInfoWrapper>
      {userProfileIsLoading && "Loading account informations..."}
      {userProfileElement}
    </StyledUserInfoWrapper>
  );
};
