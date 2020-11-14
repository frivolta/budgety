import React, { useState } from "react";
import { Expense } from "../../types";

interface ProviderProps {
  children: React.ReactChild;
}

interface ISingleExpenseContext {
  expense: Expense | null;
  setExpense: (expense: Expense) => void;
}

const initialState = {
  expense: null,
  setExpense: () => console.warn("No Expense Provider"),
};

const UseSingleExpenseContext = React.createContext<ISingleExpenseContext>(
  initialState
);

const SingleExpenseProvider = ({ children }: ProviderProps) => {
  const [expense, setExpense] = useState<Expense | null>(null);

  return (
    <UseSingleExpenseContext.Provider value={{ expense, setExpense }}>
      {children}
    </UseSingleExpenseContext.Provider>
  );
};

const useSingleExpenseValue = () => React.useContext(UseSingleExpenseContext);

export { SingleExpenseProvider, useSingleExpenseValue };
