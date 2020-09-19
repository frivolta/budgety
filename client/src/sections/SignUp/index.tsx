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

  const redirectToDashboardPage = React.useCallback(() => {
    history.push("/dashboard");
  }, [history]);

  React.useEffect(() => {
    if (renderConfirmationView) {
      setRenderConfirmationEmail(true);
    }
    if (!isUserLoading && currentUser.authenticated) {
      redirectToDashboardPage();
    }
  }, [
    renderConfirmationView,
    isUserLoading,
    currentUser.authenticated,
    redirectToDashboardPage,
  ]);

  const handleSignupFormSubmit = (email: string) => {
    setSignupEmail(email);
    setRenderConfirmationEmail(true);
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
