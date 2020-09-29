import React, { FC, useState } from "react";
import { useFormik } from "formik";
import { toasterSuccess, toasterError } from "../../../../lib/utils/toaster";
import { SIGNUP_SUCCESS, SIGNUP_ERRORS } from "../../../../lib/messages/index";
import { SignupSchema } from "../../../../lib/validation";
import { SignupFormData } from "../../types";
import { Label, Input, Button } from "../../../../lib/components";
import { H1 } from "../../../../styles/typography";
import { SignupCardSpan } from "../.././styled";
import { Link } from "react-router-dom";
import { defaultTheme } from "../../../../styles";
import { formatNetworkErrorMessages } from "../../../../lib/utils/format";
import { auth, firestore } from "../../../../lib/api/firebase";
import { NewUserProfile } from "../../../../types";
import { seedInitialDatas } from "../../../../lib/utils/seedInitialData";
import {
  defaultCategories,
  defaultUserBudget,
} from "../../../../lib/initialData";

const initialFormValues: SignupFormData = {
  email: "",
  password: "",
  confirmPassword: "",
};

const defaultUser: NewUserProfile = {
  isActive: false,
  accountName: "No balance",
  startingBalance: "0.00",
  monthlyBudget: "0.00",
};

interface Props {
  handleFormSubmit: (email: string) => void;
}

export const SignUpForm: FC<Props> = ({ handleFormSubmit }) => {
  const [, setUserEmail] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>(undefined);

  const formik = useFormik<SignupFormData>({
    initialValues: { ...initialFormValues },
    validationSchema: SignupSchema,
    onSubmit: async ({ email, password }) => {
      setIsLoading(true);
      setError(undefined);
      try {
        const { user } = await auth.createUserWithEmailAndPassword(
          email,
          password
        );
        // Add default user profile
        if (user && user.uid) {
          await firestore
            .collection("users")
            .doc(user.uid)
            .collection("profile")
            .add(defaultUser);
          await seedInitialDatas(user.uid, "categories", defaultCategories);
          await firestore
            .collection("users")
            .doc(user.uid)
            .collection("budget")
            .add(defaultUserBudget);
          setIsLoading(false);
          toasterSuccess(SIGNUP_SUCCESS.success);
          formik.resetForm();
        }
        // Add user categories
        setUserEmail(email);
        setIsLoading(false);
        toasterSuccess(SIGNUP_SUCCESS.success);
        handleFormSubmit(email);
      } catch (error) {
        setError(SIGNUP_ERRORS.signupErrorFromCognito);
        setIsLoading(false);
        toasterError(SIGNUP_ERRORS.genericError);
        console.error("[err]:>> Signup error: ", error);
      }
    },
  });

  const errorElement = error ? (
    <Label color={defaultTheme.colors.error}>
      {formatNetworkErrorMessages(error)}
    </Label>
  ) : null;

  const signupElement = (
    <>
      <H1>
        Fill out the form <br />
        and <SignupCardSpan>Sign up</SignupCardSpan>.
      </H1>
      <form onSubmit={formik.handleSubmit} data-testid="SignupForm">
        <Input
          name="email"
          placeholder="yourname@company.com"
          type="text"
          handleChange={formik.handleChange}
          handleBlur={formik.handleBlur}
          value={formik.values.email}
          label="Email"
          hasErrors={formik.touched.email && formik.errors.email ? true : false}
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
        <Button
          text="Sign up"
          disabled={!formik.isValid || !formik.dirty || isLoading}
          margin="32px 0 16px 0"
          isLoading={isLoading}
          data-testid="SubmitButton"
        />
        <Label>
          Already have an account? <Link to="/login"> Log in.</Link>
        </Label>
      </form>
    </>
  );

  return <>{signupElement}</>;
};
