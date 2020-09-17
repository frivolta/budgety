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

export const getCurrentUser = async () => {
  const isAuthorized = await userIsAuthorized();
  if (isAuthorized) {
    try {
      const currentUserInfo = await Auth.currentAuthenticatedUser();
      return currentUserInfo;
    } catch (error) {
      console.error("[err]>>Cannot get current user info: ", error);
    }
  }
};
