import React, { FC, useState } from "react";
import { FormikForm } from "./styled";
import { useFormik } from "formik";
import { toasterError, toasterSuccess } from "../../lib/utils/toaster";
import { EditSettingsSchema } from "../../lib/validation/settingsValidation";
import { User } from "../../types";
import { firestore } from "../../lib/api/firebase";
import {
  GridLayout,
  Card,
  CustomInput,
  CustomLabel,
  CustomButton,
} from "../../lib/components";
import useAuthContext from "../../lib/auth/useAuthContext";
import {
  EDIT_SETTINGS_ERROR,
  EDIT_SETTINGS_SUCCESS,
} from "../../lib/messages/index";
interface Props {
  userUid: string;
}

// @Test
// - User can see correct options
// - Confirm is used only if edit occours
// - User can go back to settings page both from top icon and bottom link
// - User can triggers api
// - If no settings is present only placeholder are shown and all links are disabled
// - Numbers are correctly formatted

export const EditSettings: FC<Props> = ({ userUid }) => {
  const [currentUser, userIsLoading] = useAuthContext();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState<any>({
    isActive: false,
    accountName: "",
    startingBalance: undefined,
    monthlyBudget: undefined,
  });

  const [error, setError] = useState(false);

  React.useEffect(() => {
    getInitialValues();
  }, []);

  const getInitialValues = async () => {
    if (currentUser && currentUser.uid) {
      const collection = await firestore
        .collection("users")
        .doc(currentUser.uid)
        .get();

      const data = await collection.data();
      setData(data);
    }
  };

  const formik = useFormik({
    initialValues: {
      accountName: data.accountName,
      startingBalance: data.startingBalance,
      monthlyBudget: data.monthlyBudget,
    },
    enableReinitialize: true,
    validationSchema: EditSettingsSchema,
    onSubmit: async (values) => {
      try {
        const editedUserData: User = {
          isActive: true,
          accountName: values.accountName,
          startingBalance: values.startingBalance,
          monthlyBudget: values.monthlyBudget,
        };
        await firestore
          .collection("users")
          .doc(currentUser?.uid)
          .set(editedUserData);
        toasterSuccess(EDIT_SETTINGS_SUCCESS.settingsUpdated);
      } catch (error) {
        toasterError(EDIT_SETTINGS_ERROR.genericError);
        console.error(error);
      }
    },
  });

  if (error) {
    toasterError("We couldn't fetch your data");
    console.error(error);
    return null;
  }

  if (isLoading && !data) {
    return <p>Loading...</p>;
  }

  return (
    <GridLayout title="Edit Settings">
      <Card customWidth={100}>
        <FormikForm onSubmit={formik.handleSubmit}>
          <CustomInput
            name="accountName"
            placeholder="account name"
            type="text"
            handleChange={formik.handleChange}
            handleBlur={formik.handleBlur}
            value={formik.values.accountName}
            label="Account name"
            hasErrors={
              formik.touched.accountName && formik.errors.accountName
                ? true
                : false
            }
            errorMessage={formik.errors.accountName?.toString()}
          />
          <CustomInput
            name="startingBalance"
            placeholder="Starting Balance"
            type="text"
            handleChange={formik.handleChange}
            handleBlur={formik.handleBlur}
            value={formik.values.startingBalance}
            label="Starting Balance"
            hasErrors={
              formik.touched.startingBalance && formik.errors.startingBalance
                ? true
                : false
            }
            errorMessage={formik.errors.startingBalance?.toString()}
          />
          <CustomInput
            name="monthlyBudget"
            placeholder="Monthly Budget"
            type="text"
            handleChange={formik.handleChange}
            handleBlur={formik.handleBlur}
            value={formik.values.monthlyBudget}
            label="Monthly Budget"
            hasErrors={
              formik.touched.monthlyBudget && formik.errors.monthlyBudget
                ? true
                : false
            }
            errorMessage={formik.errors.monthlyBudget?.toString()}
          />
          {/*error && <CustomLabel type="error">{error.message}</CustomLabel>*/}
          <CustomButton
            text="Confirm"
            disabled={!formik.isValid || !formik.dirty || isLoading}
            margin="32px 0 16px 0"
            isLoading={isLoading}
            data-testid="SubmitButton"
          />
          <CustomLabel>
            Cancel and go back to <a href="/settings">Settings Page.</a>
          </CustomLabel>
        </FormikForm>
      </Card>
    </GridLayout>
  );
};
