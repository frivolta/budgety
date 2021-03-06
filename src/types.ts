// User
export interface UserProfile {
  id: string;
  isActive: boolean;
  accountName: string;
  startingBalance: string;
  monthlyBudget: string;
}

export type NewUserProfile = Pick<
  UserProfile,
  "accountName" | "isActive" | "startingBalance" | "monthlyBudget"
>;

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
  id?: string;
  amount: string;
  date: Date;
  description: string;
  expenseType: number;
  categoryType: number;
  category: string;
};

export type MonthlyExpense = {
  incomes: number;
  expenses: number;
}

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

// Budget
export interface UserBudget {
  id?: string;
  needs: number;
  wants: number;
  savings: number;
}


