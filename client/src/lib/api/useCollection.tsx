import { useState, useEffect } from "react";
import { firestore } from "./firebase";

interface Props {
  collection: string;
}

type useCollectionData = [
  boolean,
  Error | null,
  firebase.firestore.DocumentData | null
];

export const useCollection = ({ collection }: Props): useCollectionData => {
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState<firebase.firestore.DocumentData | null>(
    null
  );

  useEffect(() => {
    setIsLoading(true);

    const unsubscribe = firestore.collection(collection).onSnapshot(
      (snapShot) => {
        setIsLoading(false);
        setData(snapShot);
      },
      (err) => {
        setError(err);
      }
    );
    return unsubscribe;
  }, [collection]);

  return [isLoading, error, data];
};
