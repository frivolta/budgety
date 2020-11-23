import React from "react";
import { firestore } from "../api/firebase";

interface Props {
  currentUserId: string;
}

export const useCategories = ({ currentUserId }: Props) => {
  const [categoriesIsLoading, setCategoriesIsLoading] = React.useState<boolean>(
    true
  );
  const [categories, setCategories] = React.useState<
    firebase.firestore.DocumentData[] | undefined
  >(undefined);

  // Triggered when current user is available
  React.useEffect(() => {
    const unsubscribe = firestore
      .collection("users")
      .doc(currentUserId.toString())
      .collection("categories")
      .onSnapshot((querySnapshot) => {
        setCategoriesIsLoading(true);

        const categories = querySnapshot.docs.map((doc) => {
          return { ...doc.data(), id: doc.id };
        });
        setCategories(categories);
        setCategoriesIsLoading(false);
      });
    return unsubscribe;
  }, [currentUserId]);

  return { categories, categoriesIsLoading };
};
