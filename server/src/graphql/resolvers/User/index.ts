import { IResolvers } from "apollo-server-express";

export const userResolvers: IResolvers = {
  Query: {
    user: (): string => "User.query",
  },
  Mutation: {
    signup: (): string => "user.signup",
  },
};
