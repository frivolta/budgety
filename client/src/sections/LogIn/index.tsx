import React, { FC, useState, useEffect } from "react";
import { LogInCard, LogInCardContent } from "./styled";
import { useFormik } from "formik";
import { LogInSchema } from "../../lib/validation/logInValidation";
import {
  FullPageLayout,
  Input,
  CustomButton,
  CustomLabel,
} from "../../lib/components";
import { H1, Span } from "../../styles/Theme/typography";
import { theme } from "../../styles/Theme";
import { formatNetworkErrorMessages } from "../../lib/utils/format";
import { LogInFormData } from "./types";
import { Link } from "react-router-dom";
import { FirebaseError } from "firebase";
import { auth } from "../../lib/api/firebase";
import { toasterSuccess, toasterError } from "../../lib/utils/toaster";
import { LOGIN_SUCCESS, LOGIN_ERRORS } from "../../lib/messages/index";

const initialFormValues: LogInFormData = {
  email: "",
  password: "",
};

export const LogIn: FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<FirebaseError | undefined>(undefined);

  useEffect(() => {
    auth.signOut();
  }, []);

  const formik = useFormik<LogInFormData>({
    initialValues: { ...initialFormValues },
    validationSchema: LogInSchema,
    onSubmit: async ({ email, password }) => {
      setIsLoading(true);
      try {
        await auth.signInWithEmailAndPassword(email, password);
        setError(undefined);
        setIsLoading(false);
        formik.resetForm();
        toasterSuccess(LOGIN_SUCCESS.success);
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
      <CustomLabel type="error">
        {formatNetworkErrorMessages(error.message)}
      </CustomLabel>
    ) : null;

  return (
    <FullPageLayout>
      <LogInCard>
        <LogInCardContent>
          <H1 color={theme.colors.darkPrimary}>
            Fill out the form <br />
            and <Span>Sign In</Span>.
          </H1>
          <form onSubmit={formik.handleSubmit}>
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
              placeholder="password"
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
            <CustomButton
              text="Sign in"
              disabled={!formik.isValid || !formik.dirty || isLoading}
              margin="32px 0 16px 0"
              isLoading={isLoading}
              data-testid="SubmitButton"
            />
            <CustomLabel>
              Don&apos;t have an account yet? <Link to="/signup">Sign up.</Link>
            </CustomLabel>
          </form>
        </LogInCardContent>
      </LogInCard>
    </FullPageLayout>
  );
};
