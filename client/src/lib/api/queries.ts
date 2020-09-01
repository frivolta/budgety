import { firestore } from "./firebase";

// Category update
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
