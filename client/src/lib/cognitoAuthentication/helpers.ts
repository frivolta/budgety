import { Auth } from "aws-amplify";

// Check if user is authenticated
export const userIsAuthorized = async (): Promise<boolean> => {
  try {
    await Auth.currentAuthenticatedUser();
    return true;
  } catch (error) {
    console.error("[err]>> Cannot get currentAuthenticatedUser: ", error);
    return false;
  }
};
