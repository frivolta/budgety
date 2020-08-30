import React, { FC, useState } from "react";
import { SignupCard, SignupCardContent } from "./styled";
import { useFormik } from "formik";
import { SignupSchema } from "../../lib/validation/signUpValidation";
import { SignupFormData } from "./types";
import {
  FullPageLayout,
  CustomInput,
  CustomButton,
  CustomLabel,
} from "../../lib/components";
import { H1, Span } from "../../styles/Theme/typography";
import { theme } from "../../styles/Theme";
import { formatNetworkErrorMessages } from "../../lib/utils/format";
import { Link } from "react-router-dom";
import { FirebaseError } from "firebase";
import { auth, firestore } from "../../lib/api/firebase";
import { toasterSuccess, toasterError } from "../../lib/utils/toaster";
import { SIGNUP_SUCCESS, SIGNUP_ERRORS } from "../../lib/messages/index";
import { User } from "../../types";

const initialFormValues: SignupFormData = {
  email: "",
  password: "",
  confirmPassword: "",
};

const defaultUser: User = {
  isActive: false,
  accountName: "No balance",
  startingBalance: 0.0,
  monthlyBudget: 0.0,
};

export const SignUp: FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<FirebaseError | undefined>(undefined);

  const formik = useFormik<SignupFormData>({
    initialValues: { ...initialFormValues },
    validationSchema: SignupSchema,
    onSubmit: async ({ email, password }) => {
      setIsLoading(true);
      try {
        const {
          user,
        }: {
          user: firebase.User | null;
        } = await auth.createUserWithEmailAndPassword(email, password);
        await firestore.collection("users").doc(user?.uid).set(defaultUser);
        setIsLoading(false);
        toasterSuccess(SIGNUP_SUCCESS.success);
        formik.resetForm();
      } catch (error) {
        setError(error);
        setIsLoading(false);
        toasterError(SIGNUP_ERRORS.genericError);
        console.error("[err]:>> Signup error: ", error);
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
      <SignupCard>
        <SignupCardContent>
          <H1 color={theme.colors.darkPrimary}>
            Fill out the form <br />
            and <Span>Sign Up</Span>.
          </H1>
          <form onSubmit={formik.handleSubmit}>
            <CustomInput
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
            <CustomInput
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
            <CustomInput
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
              disabled={!formik.isValid || !formik.dirty || isLoading}
              margin="32px 0 16px 0"
              isLoading={isLoading}
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
