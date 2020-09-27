import React from "react";
import { UserProfile } from "../../../../types";

interface Props {
  userSettings: UserProfile;
}

export const EditSettings = ({ userSettings }: Props) => {
  return <p>Edit settings</p>;
};
