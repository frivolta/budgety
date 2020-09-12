import React from "react";
import { FullPageLayout } from "../../lib/components";
import { Header } from "../../lib/components/Header";

export const SignUp = () => {
  const isAuth = false;
  return (
    <FullPageLayout>
      <Header isAuthorized={isAuth} fixedTop />
    </FullPageLayout>
  );
};
