import React, { FC } from "react";
import { ActionCard } from "../../../../lib/components/ActionCard";
import { firestore } from "../../../../lib/api/firebase";
import { expenseTypes } from "../../../../lib/costants/expenseTypes";
import { categoryTypes } from "../../../../lib/costants";
import { updateCategory } from "../../../../lib/api/queries";
import { changeCategoryType } from "../../../../lib/utils/categories";
import { Category } from "../../../../types";
import { toasterSuccess } from "../../../../lib/utils/toaster";
import { EDIT_CATEGORIES_SUCCESS } from "../../../../lib/messages";

interface Props {
  userUid: string;
}

export const CategoriesList: FC<Props> = ({ userUid }) => {
  const [categories, setCategories] = React.useState<
    firebase.firestore.DocumentData[] | null
  >(null);

  // Move it down a step to pass currentuser id
  React.useEffect(() => {
    const unsubscribe = firestore
      .collection("users")
      .doc(userUid)
      .collection("categories")
      .onSnapshot((snapShot) => {
        const collectionData = snapShot.docs.map((doc) => {
          return { ...doc.data(), docId: doc.id };
        });
        setCategories(collectionData);
      });
    return () => unsubscribe();
  }, []);

  const handleChangeCategoryType = async (
    category: firebase.firestore.DocumentData
  ) => {
    const documentId = category.docId;
    delete category.docId;
    const updatedCategory = changeCategoryType(category as Category);
    await updateCategory(userUid, documentId, updatedCategory);
    toasterSuccess(EDIT_CATEGORIES_SUCCESS.settingsUpdated);
  };

  const categoriesListElement = categories ? (
    categories.map((category) => (
      <ActionCard
        key={category.docId}
        title={`${expenseTypes[category.expenseType - 1].caption} - ${
          categoryTypes[category.budgetType - 1].caption
        }`}
        action={() => handleChangeCategoryType(category)}
        text={category.caption}
      />
    ))
  ) : (
    <p>You have no categories</p>
  );

  return <>{categoriesListElement}</>;
};
