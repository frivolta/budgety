// User
export interface UserProfile {
  isActive: false;
  accountName: string;
  startingBalance: string;
  monthlyBudget: string;
}

// Cognito User
export type UserAuth = {
  email: string;
  authenticated: boolean;
};

// Expense
export interface ExpenseType {
  id: number;
  value: string;
  caption: string;
}

export type Expense = {
  amount: string;
  date: Date;
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

export interface Option {
  value: string;
  label: string;
}
