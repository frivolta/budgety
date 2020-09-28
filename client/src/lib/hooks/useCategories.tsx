import React from "react";
import { Category, UserProfile } from "../../types";
import { firestore } from "../api/firebase";
import { getUserProfile } from "../api/queries";
import { useAuth } from "../auth/useAuth";
import useAuthContext from "../auth/useAuthContext";

interface Props {
  currentUserId: string;
}

export const useCategories = ({ currentUserId }: Props) => {
  const [categoriesIsLoading, setCategoriesIsLoading] = React.useState<boolean>(
    true
  );
  const [categories, setCategories] = React.useState<Category[] | undefined>(
    undefined
  );

  // Triggered when current user is available
  React.useEffect(() => {
    setCategoriesIsLoading(true);
    const unsubscribe = firestore
      .collection("users")
      .doc(currentUserId.toString())
      .collection("categories")
      .onSnapshot((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          //setCategories(...categories, doc.data());
          console.log(doc.data());
        });
      });
    return unsubscribe;
  });

  return { categories, categoriesIsLoading };
};
/* db.collection("cities").where("state", "==", "CA")
    .onSnapshot(function(querySnapshot) {
        var cities = [];
        querySnapshot.forEach(function(doc) {
            cities.push(doc.data().name);
        });
        console.log("Current cities in CA: ", cities.join(", "));
    }); */
