import React from "react";
import { UserBudget } from "../../types";
import { getUserBudget } from "../api/queries";
import useAuthContext from "../auth/useAuthContext";

export const useUserBudget = () => {
  const [currentUser, currentUserIsLoading] = useAuthContext();
  const [loading, setIsLoading] = React.useState<boolean>(true);
  const [userBudget, setUserBudget] = React.useState<UserBudget | null>(null);

  React.useEffect(() => {
    if (!currentUserIsLoading && currentUser?.uid) {
      getData(currentUser.uid);
    }
  }, [currentUser, currentUserIsLoading]);

  const getData = async (uuid: string) => {
    const budget = await getUserBudget(uuid);
    if (budget) {
      setUserBudget(budget);
    }
    setIsLoading(false);
  };

  return { userBudget, loading };
};
