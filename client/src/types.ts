export interface User {
  isActive: boolean;
  accountName: string;
  startingBalance: number;
  monthlyBudget: number;
}

// Expense
export interface ExpenseType {
  id: number;
  value: string;
  caption: string;
}

export type Expense = {
  id: string;
  description: string;
  amount: number;
  category: string;
  type: string;
  date: string;
};

// Category
export interface Category {
  id: number;
  expenseType: number;
  budgetType: number;
  value: string;
  caption: string;
  color: string;
}

export interface CategoryType {
  id: number;
  value: string;
  caption: string;
}
