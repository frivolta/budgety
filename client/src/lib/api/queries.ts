import { firestore } from "./firebase";
import { Expense } from "../../types";

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

// Expenses
export const addExpense = async (userUid: string, expense: Expense) => {
  console.log(userUid, expense);
  await firestore
    .collection("users")
    .doc(userUid)
    .collection("expenses")
    .add(expense);
};
