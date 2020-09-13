import { useState, useEffect } from "react";

export type UseSidebar = [
  boolean,
  React.Dispatch<React.SetStateAction<boolean>>
];

export const useSidebar = (newOpenValue: boolean): UseSidebar => {
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    setIsOpen(newOpenValue);
  }, [newOpenValue]);

  return [isOpen, setIsOpen];
};
