import React, { FC, useState } from "react";
import { Card, FullPageLayout } from "../../lib/components";
import { SignUpForm, ConfirmCodeForm } from "./components";
import { useHistory } from "react-router-dom";
import useAuthContext from "../../lib/auth/useAuthContext";

interface Props {
  renderConfirmationView?: boolean;
}

export const SignUp: FC<Props> = ({ renderConfirmationView }) => {
  const [currentUser, isLoadingCurrentUser] = useAuthContext();

  const [signupEmail, setSignupEmail] = useState<string | undefined>(undefined);
  const [renderConfirmationEmail, setRenderConfirmationEmail] = useState<
    boolean
  >(false);
  const history = useHistory();

  React.useEffect(() => {
    if (renderConfirmationView) {
      setRenderConfirmationEmail(true);
    }
  }, [renderConfirmationView]);

  const handleSignupFormSubmit = (email: string) => {
    setSignupEmail(email);
    setRenderConfirmationEmail(true);
  };

  const redirectToDashboardPage = () => {
    history.push("/expenses");
  };

  if (currentUser?.uid && !isLoadingCurrentUser) {
    redirectToDashboardPage();
  }

  const formElement =
    signupEmail && renderConfirmationEmail ? (
      <ConfirmCodeForm userEmail={signupEmail} />
    ) : (
      <SignUpForm handleFormSubmit={handleSignupFormSubmit} />
    );

  return (
    <FullPageLayout>
      <Card>{formElement}</Card>
    </FullPageLayout>
  );
};
