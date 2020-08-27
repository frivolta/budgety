import React, { FC } from "react";
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

const initialFormValues: LogInFormData = {
  email: "",
  password: "",
};

export const LogIn: FC = () => {
  // Mocking api state
  const error = false;
  const errMessage = "message";
  const loading = false;

  const formik = useFormik<LogInFormData>({
    initialValues: { ...initialFormValues },
    validationSchema: LogInSchema,
    onSubmit: async (values) => {
      try {
        console.log("Submitting", values);
        formik.resetForm();
      } catch {
        console.log("catching");
      }
    },
  });

  const errorElement = error ? (
    <CustomLabel type="error">
      {formatNetworkErrorMessages(errMessage)}
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
              disabled={!formik.isValid || !formik.dirty || loading}
              margin="32px 0 16px 0"
              isLoading={loading}
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
