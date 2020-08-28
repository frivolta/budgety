import { Collection, ObjectId } from "mongodb";

// User will have:
// - needs categories
// - wants categories
// - uncategorized categories
// - expenses

export interface User {
  _id: ObjectId;
  firebaseUid: string;
  email: string;
  accountName: string;
  startingBalance: number;
  monthlyBudget: number;
}

export interface Database {
  users: Collection<User>;
}
