import React, { FC, useState } from "react";
import { BrandLogo } from "./styled";
import { Card, FullPageLayout } from "../../lib/components";
import { SignUpForm, ConfirmCodeForm } from "./components";
import brandLogo from "./assets/images/brand.svg";

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
      <Card>
        <BrandLogo src={brandLogo} />
        {formElement}
      </Card>
    </FullPageLayout>
  );
};
