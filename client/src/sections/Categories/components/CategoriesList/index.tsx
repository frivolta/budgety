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
import { LoadingScreen, Card } from "../../../../lib/components";
import { H4 } from "../../../../styles/Theme/typography";
import { theme } from "../../../../styles/Theme/index";

interface Props {
  userUid: string;
}

export const CategoriesList: FC<Props> = ({ userUid }) => {
  const [categories, setCategories] = React.useState<
    firebase.firestore.DocumentData[] | null
  >(null);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    setIsLoading(true);
    const unsubscribe = firestore
      .collection("users")
      .doc(userUid)
      .collection("categories")
      .onSnapshot((snapShot) => {
        const collectionData = snapShot.docs.map((doc) => {
          return { ...doc.data(), docId: doc.id };
        });
        setCategories(collectionData);
        setIsLoading(false);
      });
    return () => unsubscribe();
  }, [userUid]);

  const handleChangeCategoryType = async (
    category: firebase.firestore.DocumentData
  ) => {
    const documentId = category.docId;
    delete category.docId;
    const updatedCategory = changeCategoryType(category as Category);
    await updateCategory(userUid, documentId, updatedCategory);
    toasterSuccess(EDIT_CATEGORIES_SUCCESS.settingsUpdated);
  };

  if (isLoading) {
    return <LoadingScreen loadingText="Loading categories..." />;
  }

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
    <Card>
      <H4 color={theme.colors.darkPrimary}>You have no categories</H4>
    </Card>
  );

  return <>{categoriesListElement}</>;
};
