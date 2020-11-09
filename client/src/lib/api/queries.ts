import { firestore } from "./firebase";
import { Expense, NewUserProfile, UserBudget, UserProfile } from "../../types";

// Categories
export const updateCategory = async <T>(
  userUid: string,
  documentId: string,
  updatedCategory: T
) => {
  try {
    await firestore
      .collection("users")
      .doc(userUid)
      .collection("categories")
      .doc(documentId)
      .update(updatedCategory);
  } catch (error) {
    console.error("[err]: Error updating category: ", error);
  }
};

export const getCategories = async (userUid: string) => {
  try {
    const snapshot = await firestore
      .collection("users")
      .doc(userUid)
      .collection("categories")
      .get();
    const categories = snapshot.docs.map((doc) => doc.data());
    return categories;
  } catch (error) {
    console.error("[err]: Error getting categories: ", error);
  }
};

// User Profile
export const getUserProfile = async (userUid: string) => {
  console.log("Fetching for", userUid);
  try {
    const snapshot = await firestore
      .collection("users")
      .doc(userUid)
      .collection("profile")
      .get();
    const profile = snapshot.docs.map((doc) => {
      return { id: doc.id, ...doc.data() };
    });
    if (profile[0]) {
      return profile[0] as UserProfile;
    }
    return null;
  } catch (error) {
    console.error("[err]: Error getting user profile: ", error);
  }
};

// Update user profile
export const updateUserProfile = async (
  newUserProfile: NewUserProfile,
  documentUid: string,
  userUid: string
) => {
  try {
    await firestore
      .collection("users")
      .doc(userUid)
      .collection("profile")
      .doc(documentUid)
      .set(newUserProfile);
  } catch (error) {
    console.error("[err]: Error updating user profile: ", error);
  }
};
// Expenses
export const addExpense = async (userUid: string, expense: Expense) => {
  await firestore
    .collection("users")
    .doc(userUid)
    .collection("expenses")
    .add(expense);
};

export const getExpenses = async (userUid: string) => {
  const snapshot = await firestore
    .collection("users")
    .doc(userUid)
    .collection("expenses")
    .get();
  const expenses = snapshot.docs.map((doc) => doc.data());
  return expenses;
};

// Budget Details
export const getUserBudget = async (userUid: string) => {
  console.log("Fetching for", userUid);
  try {
    const snapshot = await firestore
      .collection("users")
      .doc(userUid)
      .collection("budget")
      .get();
    const budget = snapshot.docs.map((doc) => {
      return { id: doc.id, ...doc.data() };
    });
    if (budget[0]) {
      return budget[0] as UserBudget;
    }
    return null;
  } catch (error) {
    console.error("[err]: Error getting user budget: ", error);
  }
};

export const updateUserBudget = async (
  userUid: string,
  budgetId: string,
  values: UserBudget
) => {
  await firestore
    .collection("users")
    .doc(userUid)
    .collection("budget")
    .doc(budgetId)
    .update(values);
};
