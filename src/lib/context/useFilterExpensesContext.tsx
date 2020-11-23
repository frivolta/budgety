import React, { useState } from "react";

interface ProviderProps {
  children: React.ReactChild;
}

interface IFilterExpense {
  filterDate: Date;
  setFilterDate: (month: Date) => void;
}

const initialState = {
  filterDate: new Date(),
  setFilterDate: () => console.warn("No Filter Expense Provider"),
};

const FilterExpensesContext = React.createContext<IFilterExpense>(initialState);

const FilterExpensesProvider = ({ children }: ProviderProps) => {
  const [filterDate, setFilterDate] = useState<Date>(initialState.filterDate);

  return (
    <FilterExpensesContext.Provider value={{ filterDate, setFilterDate }}>
      {children}
    </FilterExpensesContext.Provider>
  );
};

const useFilterExpenses = () => React.useContext(FilterExpensesContext);

export { FilterExpensesProvider, useFilterExpenses };
