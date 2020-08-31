import { useState, useEffect } from "react";
import { firestore } from "./firebase";

interface Props {
  collection: string;
  document: string;
}

type useDocumentData = [
  boolean,
  Error | null,
  firebase.firestore.DocumentData | null
];

export const useDocument = ({
  collection,
  document,
}: Props): useDocumentData => {
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [data, setData] = useState<firebase.firestore.DocumentData | null>(
    null
  );

  useEffect(() => {
    setIsLoading(true);
    const unsubscribe = firestore
      .collection(collection)
      .doc(document)
      .onSnapshot(
        (doc) => {
          setData(doc);
          setIsLoading(false);
        },
        (err) => {
          setError(err);
        }
      );
    return unsubscribe;
  }, [document, collection]);

  return [isLoading, error, data];
};
