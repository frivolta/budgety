import React, { FC, useState } from "react";
import { useFormik } from "formik";
import { LogInSchema } from "../../lib/validation";
import {
  FullPageLayout,
  Input,
  Button,
  Label,
  Card,
  Header,
} from "../../lib/components";
import { Auth } from "aws-amplify";
import { LogInCardSpan, BrandLogo } from "./styled";
import { H1 } from "../../styles/typography";
import { formatNetworkErrorMessages } from "../../lib/utils/format";
import { LogInFormData } from "./types";
import { Link, useHistory } from "react-router-dom";
import { FirebaseError } from "firebase";
import { toasterSuccess, toasterError } from "../../lib/utils/toaster";
import { LOGIN_SUCCESS, LOGIN_ERRORS } from "../../lib/messages/index";
import { red } from "../../styles";
import brandLogo from "./assets/images/brand.svg";
import { useAuth } from "../../lib/cognitoAuthentication/useAuth";

const initialFormValues: LogInFormData = {
  email: "",
  password: "",
};

export const LogIn: FC = () => {
  const [isUserLoading, currentUser] = useAuth();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<FirebaseError | undefined>(undefined);
  const history = useHistory();

  React.useEffect(() => {
    if (!isUserLoading && currentUser.authenticated) {
      redirectToDashboardPage();
    }
  }, [isUserLoading]);

  const redirectToDashboardPage = () => {
    history.push("/dashboard");
  };

  const formik = useFormik<LogInFormData>({
    initialValues: { ...initialFormValues },
    validationSchema: LogInSchema,
    onSubmit: async ({ email, password }) => {
      setIsLoading(true);
      try {
        await Auth.signIn(email, password);
        setError(undefined);
        setIsLoading(false);
        formik.resetForm();
        toasterSuccess(LOGIN_SUCCESS.success);
        redirectToDashboardPage();
      } catch (error) {
        setError(error);
        setIsLoading(false);
        toasterError(LOGIN_ERRORS.genericError);
        console.error("[err]:>> LogIn error: ", error);
      }
    },
  });

  const errorElement =
    error && error.message ? (
      <Label color={red[200]}>
        {formatNetworkErrorMessages(error.message)}
      </Label>
    ) : null;

  return (
    <FullPageLayout>
      <Card>
        <BrandLogo src={brandLogo} />
        <H1>
          Fill out the form <br />
          and <LogInCardSpan>Sign In</LogInCardSpan>.
        </H1>
        <form onSubmit={formik.handleSubmit} data-testid="LogInForm">
          <Input
            name="email"
            placeholder="yourname@company.com"
            type="text"
            handleChange={formik.handleChange}
            handleBlur={formik.handleBlur}
            value={formik.values.email}
            label="Email"
            hasErrors={
              formik.touched.email && formik.errors.email ? true : false
            }
            errorMessage={formik.errors.email}
          />
          <Input
            name="password"
            placeholder="Password"
            type="password"
            label="Password"
            handleChange={formik.handleChange}
            handleBlur={formik.handleBlur}
            value={formik.values.password}
            hasErrors={
              formik.touched.password && formik.errors.password ? true : false
            }
            errorMessage={formik.errors.password}
          />
          {errorElement}
          <Button
            text="Sign in"
            disabled={!formik.isValid || !formik.dirty || isLoading}
            margin="32px 0 16px 0"
            isLoading={isLoading}
            data-testid="SubmitButton"
          />
          <Label>
            Don&apos;t have an account yet? <Link to="/signup">Sign up.</Link>
          </Label>
        </form>
      </Card>
    </FullPageLayout>
  );
};
