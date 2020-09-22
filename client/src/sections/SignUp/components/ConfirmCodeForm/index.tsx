import React, { FC, useState } from "react";
import { Label, Input, Button } from "../../../../lib/components";
import { H1 } from "../../../../styles/typography";
import { Link } from "react-router-dom";
import { formatNetworkErrorMessages } from "../../../../lib/utils/format";
import { ConfirmCodeFormSpan } from "./styled";
import { Auth } from "aws-amplify";
import { defaultTheme } from "../../../../styles";
import { SIGNUP_ERRORS, SIGNUP_SUCCESS } from "../../../../lib/messages";
import { toasterSuccess } from "../../../../lib/utils/toaster";

interface Props {
  userEmail: string;
}

export const ConfirmCodeForm: FC<Props> = ({ userEmail }) => {
  const [confirmationCodeValue, setConfirmationCodeValue] = useState<string>(
    ""
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<undefined | string>(undefined);
  const [isDirty, setIsDirty] = useState<boolean>(false);
  const [codeHasValidLength, setCodeHasValidLength] = useState<boolean>(false);

  const confirmSignUp = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    if (confirmationCodeValue && userEmail) {
      try {
        await Auth.confirmSignUp(userEmail, confirmationCodeValue);
        setIsLoading(false);
        toasterSuccess(SIGNUP_SUCCESS.confirmSucces);
      } catch (error) {
        setError(SIGNUP_ERRORS.confirmationCodeError);
        console.log("error confirming sign up", error);
        setIsLoading(false);
      }
    }
  };

  const handleChange = (value: string): void => {
    setConfirmationCodeValue(value);
    !isDirty && setIsDirty(true);
    !!error && setError(undefined);
    value.length === 6 && setCodeHasValidLength(true);
  };

  const errorElement = error ? (
    <Label color={defaultTheme.colors.error}>
      {formatNetworkErrorMessages(error)}
    </Label>
  ) : null;

  const confirmationCodeElement = (
    <>
      <H1>
        Enter the
        <ConfirmCodeFormSpan> confirmation code</ConfirmCodeFormSpan>
        <br /> you received by email.
      </H1>
      <form onSubmit={(event) => confirmSignUp(event)} data-testid="SignupForm">
        <Input
          name="confirmationCode"
          placeholder="123456"
          type="text"
          handleChange={(event) => handleChange(event.target.value)}
          value={confirmationCodeValue}
          label="Confirmation code"
        />

        {errorElement}
        <Button
          text="Send code"
          disabled={isLoading || !isDirty || !codeHasValidLength || !!error}
          margin="32px 0 16px 0"
          isLoading={isLoading}
          data-testid="SubmitButton"
        />
        <Label>
          Resend <Link to="/login">confirmation code. </Link>
        </Label>
      </form>
    </>
  );

  return <>{confirmationCodeElement}</>;
};
