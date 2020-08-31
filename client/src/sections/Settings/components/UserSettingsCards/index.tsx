import React, { FC } from "react";
import { ActionCard } from "../../../../lib/components";
import { useHistory } from "react-router-dom";
import { useDocument } from "../../../../lib/api/useDocument";
import { toasterError } from "../../../../lib/utils/toaster";

interface Props {
  userUid: string;
}

export const UserSettingsCard: FC<Props> = ({ userUid }) => {
  const history = useHistory();
  const [isLoading, error, data] = useDocument({
    collection: "users",
    document: userUid,
  });

  const redirectToEditSettings = () => {
    history.push("/settings/edit");
  };

  if (error) {
    toasterError("We couldn't fetch your data");
    console.error(error);
    return null;
  }

  if (isLoading && !data) {
    return <p>Loading...</p>;
  }

  if (data) {
    const { accountName, startingBalance, monthlyBudget } = data.data();
    return (
      <>
        <ActionCard
          title="ACCOUNT NAME"
          text={accountName}
          action={redirectToEditSettings}
        />
        <ActionCard
          title="STARTING BALANCE"
          text={startingBalance}
          action={redirectToEditSettings}
        />
        <ActionCard
          title="MONTHLY BUDGET"
          text={monthlyBudget}
          action={redirectToEditSettings}
        />
      </>
    );
  }
  return null;
};
