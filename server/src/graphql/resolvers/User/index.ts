import { IResolvers } from "apollo-server-express";
import { Response, Request } from "express";
import { Database, User } from "../../../lib/types";
import { UserSignUpArgs, UserArgs } from "./types";
import { ObjectId } from "mongodb";

export const userResolvers: IResolvers = {
  Query: {
    user: async (
      _root: undefined,
      { firebaseUid }: UserArgs,
      { db }: { db: Database }
    ): Promise<User> => {
      try {
        const user = await db.users.findOne({
          firebaseUid,
        });
        if (!user) {
          throw new Error("[err]>>User cannot be found");
        }
        return user;
      } catch (error) {
        throw new Error(`[err]>>Query "user" failed: ${error}`);
      }
    },
  },

  Mutation: {
    signUp: async (
      _root: undefined,
      { email, firebaseUid }: UserSignUpArgs,
      { db }: { db: Database; req: Request; res: Response }
    ): Promise<User> => {
      // Define an initial user
      const initialUser: User = {
        _id: new ObjectId(),
        email,
        firebaseUid,
        startingBalance: 0.0,
        monthlyBudget: 0.0,
        accountName: "No balance name",
      };

      // Insert the default user in the db
      try {
        const user = await db.users.insertOne(initialUser);
        return user.ops[0];
      } catch (error) {
        throw new Error(`[err]>>Failed to create a new user: ${error}`);
      }
    },
  },
};
