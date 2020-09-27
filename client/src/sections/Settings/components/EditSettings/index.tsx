import React, { useState } from "react";
import { firestore } from "../../../../lib/api/firebase";
import { Button, Card, CurrencyInput, Input } from "../../../../lib/components";
import { useUserProfile } from "../../../../lib/hooks/useUserProfile";
import {
  EDIT_SETTINGS_ERROR,
  EDIT_SETTINGS_SUCCESS,
} from "../../../../lib/messages";
import { toasterError, toasterSuccess } from "../../../../lib/utils/toaster";
import { H3 } from "../../../../styles";
import { StyledEditSettingsForm, StyledEditSettingsWrapper } from "./styled";

interface Props {
  currentUser: firebase.User;
  handleSwitchToSettings: () => void;
}

export const EditSettings = ({
  handleSwitchToSettings,
  currentUser,
}: Props) => {
  const { userProfile, loading: userProfileIsLoading } = useUserProfile();
  const [isLoading, setIsLoading] = useState(false);
  const [accountName, setAccountName] = useState(
    userProfile?.accountName || "No account name"
  );
  const [startingBalance, setStartingBalance] = useState(
    userProfile?.startingBalance || "0.00"
  );
  const [monthlyBudget, setMonthlyBudget] = useState(
    userProfile?.monthlyBudget || "0.00"
  );

  React.useEffect(() => {
    if (!userProfileIsLoading && userProfile) {
      setAccountName(userProfile.accountName);
      setStartingBalance(userProfile.startingBalance);
      setMonthlyBudget(userProfile.monthlyBudget);
    }
  }, [userProfile, userProfileIsLoading]);

  const handleSubmitSettings = async (
    event: React.BaseSyntheticEvent<object, any, any>
  ) => {
    event.preventDefault();
    setIsLoading(true);
    const newUserProfile = {
      isActive: true,
      accountName,
      startingBalance,
      monthlyBudget,
    };
    if (userProfile?.id) {
      try {
        await firestore
          .collection("users")
          .doc(currentUser.uid)
          .collection("profile")
          .doc(userProfile.id)
          .set(newUserProfile);
        toasterSuccess(EDIT_SETTINGS_SUCCESS.settingsUpdated);
        handleSwitchToSettings();
      } catch (error) {
        console.log("[err]>>> Saving new settings", error);
        toasterError(EDIT_SETTINGS_ERROR.genericError);
      } finally {
        setIsLoading(false);
      }
    } else {
      throw new Error("[err]>>> Saving new settings: id is not valid");
    }
  };

  const handleStartingBalanceChange = (formattedValue: string | undefined) => {
    if (formattedValue) {
      setStartingBalance(formattedValue);
    }
  };
  const handleMonthlyBudgetChange = (formattedValue: string | undefined) => {
    if (formattedValue) {
      setMonthlyBudget(formattedValue);
    }
  };

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
      <CurrencyInput
        name="currency"
        label="Starting Balance"
        prefix="€ "
        allowDecimals
        decimalsLimit={2}
        value={startingBalance}
        onChange={handleStartingBalanceChange}
        precision={2}
      />
      <CurrencyInput
        name="currency"
        label="Monthly Balance"
        prefix="€ "
        allowDecimals
        decimalsLimit={2}
        value={monthlyBudget}
        onChange={handleMonthlyBudgetChange}
        precision={2}
      />
      <Button
        text="Save settings"
        handleClick={(event) => handleSubmitSettings(event)}
        isLoading={isLoading || userProfileIsLoading}
      />
      <Button
        secondary
        text="Cancel and go back"
        handleClick={handleSwitchToSettings}
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
