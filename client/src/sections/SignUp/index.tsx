import React, { FC, useState } from "react";
import { auth, firestore } from "../../lib/api/firebase";
import { defaultCategories } from "../../lib/initialData/categories";
import { seedInitialDatas } from "../../lib/utils/seedInitialData";
import useAuthContext from "../../lib/auth/useAuthContext";
import { useFormik } from "formik";
import { toasterSuccess, toasterError } from "../../lib/utils/toaster";
import { SIGNUP_SUCCESS, SIGNUP_ERRORS } from "../../lib/messages/index";
import { SignupSchema } from "../../lib/validation";
import { FirebaseError } from "firebase";
import { SignupFormData } from "./types";
import {
  Header,
  Card,
  FullPageLayout,
  Label,
  Input,
  Button,
} from "../../lib/components";
import { H1 } from "../../styles/typography";
import { SignupCardSpan } from "./styled";
import { User } from "../../types";
import { useHistory, Link } from "react-router-dom";
import { defaultTheme } from "../../styles";
import { formatNetworkErrorMessages } from "../../lib/utils/format";

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
  //const [currentUser, isLoadingCurrentUser] = useAuthContext();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<FirebaseError | undefined>(undefined);
  const history = useHistory();

  React.useEffect(() => {
    auth.signOut();
  }, []);

  const redirectToDashboardPage = () => {
    history.push("/dashboard");
  };

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
        if (user && user.uid) {
          /*  await firestore.collection("users").doc(user.uid).set(defaultUser);
          await seedInitialDatas(user.uid, "categories", defaultCategories); */
          setIsLoading(false);
          toasterSuccess(SIGNUP_SUCCESS.success);
          formik.resetForm();
          redirectToDashboardPage();
        }
      } catch (error) {
        setError(error);
        setIsLoading(false);
        toasterError(SIGNUP_ERRORS.genericError);
        console.error("[err]:>> Signup error: ", error);
      }
    },
  });

  /*   if (currentUser?.uid && !isLoadingCurrentUser) {
    redirectToDashboardPage();
  }
 */
  const errorElement =
    error && error.message ? (
      <Label color={defaultTheme.colors.error}>
        {formatNetworkErrorMessages(error.message)}
      </Label>
    ) : null;

  const isAuth = false;
  return (
    <FullPageLayout>
      <Header isAuthorized={isAuth} fixedTop />
      <Card>
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
      </Card>
    </FullPageLayout>
  );
};
