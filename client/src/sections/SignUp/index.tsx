import React, { FC, useState } from "react";
import { BrandLogo } from "./styled";
import { Card, FullPageLayout } from "../../lib/components";
import { SignUpForm, ConfirmCodeForm } from "./components";
import brandLogo from "./assets/images/brand.svg";
import { useAuth } from "../../lib/cognitoAuthentication/useAuth";
import { useHistory } from "react-router-dom";

interface Props {
  renderConfirmationView?: boolean;
}

export const SignUp: FC<Props> = ({ renderConfirmationView }) => {
  const [isUserLoading, currentUser] = useAuth();
  const [signupEmail, setSignupEmail] = useState<string | undefined>(undefined);
  const [renderConfirmationEmail, setRenderConfirmationEmail] = useState<
    boolean
  >(false);
  const history = useHistory();

  React.useEffect(() => {
    if (renderConfirmationView) {
      setRenderConfirmationEmail(true);
    }
    if (!isUserLoading && currentUser.authenticated) {
      redirectToDashboardPage();
    }
  }, [renderConfirmationView, isUserLoading]);

  const handleSignupFormSubmit = (email: string) => {
    setSignupEmail(email);
    setRenderConfirmationEmail(true);
  };
  const redirectToDashboardPage = () => {
    history.push("/dashboard");
  };

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
