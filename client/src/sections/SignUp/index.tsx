import React, { FC, useState } from "react";

import { Header, Card, FullPageLayout } from "../../lib/components";
import { SignUpForm, ConfirmCodeForm } from "./components";

interface Props {
  renderConfirmationView?: boolean;
}

export const SignUp: FC<Props> = ({ renderConfirmationView }) => {
  const [signupEmail, setSignupEmail] = useState<string | undefined>(undefined);
  const [renderConfirmationEmail, setRenderConfirmationEmail] = useState<
    boolean
  >(false);

  React.useEffect(() => {
    if (renderConfirmationView) {
      setRenderConfirmationEmail(true);
    }
  }, [renderConfirmationView]);

  const handleSignupFormSubmit = (email: string) => {
    setSignupEmail(email);
    setRenderConfirmationEmail(true);
  };

  const isAuthorized = false;

  const formElement =
    signupEmail && renderConfirmationEmail ? (
      <ConfirmCodeForm userEmail={signupEmail} />
    ) : (
      <SignUpForm handleFormSubmit={handleSignupFormSubmit} />
    );

  return (
    <FullPageLayout>
      <Header isAuthorized={isAuthorized} fixedTop />
      <Card>{formElement}</Card>
    </FullPageLayout>
  );
};
