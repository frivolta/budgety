import { firestore } from "../api/firebase";

type SeedInitialData = <T>(
  userUid: string,
  collectionName: string,
  itemsToSeed: T[]
) => Promise<void>;

export const seedInitialDatas: SeedInitialData = async (
  userUid,
  collectionName,
  itemsToSeed
) => {
  itemsToSeed.forEach(async (itemToSeed) => {
    await firestore
      .collection("users")
      .doc(userUid)
      .collection(collectionName)
      .add(itemToSeed);
  });
};
