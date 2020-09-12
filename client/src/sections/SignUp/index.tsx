import React from "react";
import { FullPageLayout } from "../../lib/components";
import { Header, Card } from "../../lib/components";
import { H1 } from "../../styles/typography";
import { SignupCardSpan } from "./styled";
export const SignUp = () => {
  const isAuth = false;
  return (
    <FullPageLayout>
      <Header isAuthorized={isAuth} fixedTop />
      <Card>
        <H1>
          Fill out the form <br />
          and <SignupCardSpan>Sign up</SignupCardSpan>.
        </H1>
      </Card>
    </FullPageLayout>
  );
};
