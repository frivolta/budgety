import React, { useState } from "react";
import { Button, Card, Input } from "../../../../lib/components";
import { H3 } from "../../../../styles";
import { UserProfile } from "../../../../types";
import { StyledEditSettingsForm, StyledEditSettingsWrapper } from "./styled";

interface Props {
  userSettings: UserProfile;
  handleSwitchToSettings: () => void;
}

export const EditSettings = ({
  userSettings,
  handleSwitchToSettings,
}: Props) => {
  //  const { accountName, startingBalance, monthlyBudget } = userSettings;
  const [accountName, setAccountName] = useState(userSettings.accountName);

  const handleSubmitSettings = () => console.log("Settings submitted");

  const editSettingsFormElement = (
    <StyledEditSettingsForm>
      <Input
        value={accountName}
        label="Account Name"
        placeholder="account-name"
        type="text"
        name="accountName"
        handleChange={(event) => setAccountName(event.target.value)}
      />
      <Button text="Save settings" handleClick={handleSubmitSettings} />
      <Button
        secondary
        text="Cancel and go back"
        handleClick={handleSubmitSettings}
      />
    </StyledEditSettingsForm>
  );

  return (
    <StyledEditSettingsWrapper>
      <H3>Edit Settings</H3>
      <Card height="auto">{editSettingsFormElement}</Card>
    </StyledEditSettingsWrapper>
  );
};
