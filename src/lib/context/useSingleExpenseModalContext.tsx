import React, { useState } from "react";

interface ProviderProps {
  children: React.ReactChild;
}

interface ISingleExpenseModalIsOpenContext {
  isModalOpen: boolean;
  setIsModalOpen: (value: boolean) => void;
}

const initialState = {
  isModalOpen: false,
  setIsModalOpen: () => console.warn("No Modal Expense Provider"),
};

const UseSingleExpenseContextModal = React.createContext<
  ISingleExpenseModalIsOpenContext
>(initialState);

const UseSingleExpenseModalProvider = ({ children }: ProviderProps) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  console.log("Called");
  return (
    <UseSingleExpenseContextModal.Provider
      value={{ isModalOpen, setIsModalOpen }}
    >
      {children}
    </UseSingleExpenseContextModal.Provider>
  );
};

const useSingleExpenseModalValue = () =>
  React.useContext(UseSingleExpenseContextModal);

export { UseSingleExpenseModalProvider, useSingleExpenseModalValue };
