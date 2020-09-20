import React from "react";
import { UserAuth } from "../../../../../types";
import { StyledHeaderUser } from "./styled";

interface Props {
  user: UserAuth;
}

export const HeaderUser = ({ user }: Props) => {
  return <StyledHeaderUser>{user.email}</StyledHeaderUser>;
};
