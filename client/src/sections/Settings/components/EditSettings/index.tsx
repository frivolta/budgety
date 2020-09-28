import React, { useState } from "react";
import { updateUserProfile } from "../../../../lib/api/queries";
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
  const [formErrors, setFormErrors] = useState({
    accountName: { isValid: true, errorMessage: null },
    startingBalance: { isValid: true, errorMessage: null },
    monthlyBudget: { isValid: true, errorMessage: null },
  });

  const [isFormDirty, setIsFormDirty] = useState(false);

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
      accountName: accountName.length > 1 ? accountName : "No account name",
      startingBalance,
      monthlyBudget,
    };
    if (userProfile?.id) {
      try {
        await updateUserProfile(
          newUserProfile,
          userProfile.id,
          currentUser.uid
        );
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
    !isFormDirty && setIsFormDirty(true);
    if (formattedValue) {
      setStartingBalance(formattedValue);
    }
  };
  const handleMonthlyBudgetChange = (formattedValue: string | undefined) => {
    !isFormDirty && setIsFormDirty(true);
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
        handleChange={(event) => {
          !isFormDirty && setIsFormDirty(true);
          setAccountName(event.target.value);
        }}
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
        disabled={!isFormDirty}
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