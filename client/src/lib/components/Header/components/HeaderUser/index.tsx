import React from "react";
import { UserAuth } from "../../../../../types";

interface Props {
  user: UserAuth;
}

export const HeaderUser = ({ user }: Props) => {
  return <p data-testid="HeaderUserEmail">{user.email}</p>;
};
