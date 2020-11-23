import React from "react";
import { User } from "firebase";
import { StyledHeaderUser } from "./styled";

interface Props {
  user: User;
}

export const HeaderUser = ({ user }: Props) => {
  return <StyledHeaderUser>{user.email}</StyledHeaderUser>;
};
