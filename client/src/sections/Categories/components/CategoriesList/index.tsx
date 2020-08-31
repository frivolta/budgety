import React, { FC } from "react";
import { ActionCard } from "../../../../lib/components/ActionCard/index";
import { firestore } from "../../../../lib/api/firebase";
import { expenseTypes } from "../../../../lib/costants/expenseTypes";
import { categoryTypes } from "../../../../lib/costants";

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
    console.log(category);
    const documentId = category.docId;
    // define the opposite but without incomes
    const updatedCategory = {
      ...category,
      budgetType: category.budgetType === 1 ? 2 : 1,
    };
    delete category.docId;
    console.log(updatedCategory);
    await firestore
      .collection("users")
      .doc(userUid)
      .collection("categories")
      .doc(documentId)
      .update(updatedCategory);
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
