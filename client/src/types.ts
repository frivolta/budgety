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
  amount: number;
  date: number;
  description: string;
  expenseType: number;
  categoryType: number;
  category: string;
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
