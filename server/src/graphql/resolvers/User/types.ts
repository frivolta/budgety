import { ObjectId } from "mongodb";

export interface UserArgs {
  firebaseUid: string;
}

export interface UserSignUpArgs {
  email: string;
  firebaseUid: string;
}
