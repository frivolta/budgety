import React, { FC } from "react";
import { SignupCard, SignupCardContent } from "./styled";
import { useFormik } from "formik";
import { SignupSchema } from "../../lib/validation/signUpValidation";
import { SignupFormData } from "./types";
import {
  FullPageLayout,
  Input,
  CustomButton,
  CustomLabel,
} from "../../lib/components";
import { H1, Span } from "../../styles/Theme/typography";
import { theme } from "../../styles/Theme";
import { formatNetworkErrorMessages } from "../../lib/utils/format";
import { Link } from "react-router-dom";

const initialFormValues: SignupFormData = {
  email: "",
  password: "",
  confirmPassword: "",
};

export const SignUp: FC = () => {
  // Mocking api state
  const error = false;
  const errMessage = "message";
  const loading = false;

  const formik = useFormik<SignupFormData>({
    initialValues: { ...initialFormValues },
    validationSchema: SignupSchema,
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
      <SignupCard>
        <SignupCardContent>
          <H1 color={theme.colors.darkPrimary}>
            Fill out the form <br />
            and <Span>Sign Up</Span>.
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
            <Input
              name="confirmPassword"
              placeholder="Confirm Password"
              label="Confirm Password"
              type="password"
              handleChange={formik.handleChange}
              handleBlur={formik.handleBlur}
              value={formik.values.confirmPassword}
              hasErrors={
                formik.touched.confirmPassword && formik.errors.confirmPassword
                  ? true
                  : false
              }
              errorMessage={formik.errors.confirmPassword}
            />
            {errorElement}
            <CustomButton
              text="Sign up"
              disabled={!formik.isValid || !formik.dirty || loading}
              margin="32px 0 16px 0"
              isLoading={loading}
              data-testid="SubmitButton"
            />
            <CustomLabel>
              Already have an account? <Link to="/login"> Log in.</Link>
            </CustomLabel>
          </form>
        </SignupCardContent>
      </SignupCard>
    </FullPageLayout>
  );
};
