import { Expense, UserBudget, UserProfile } from "../types"

// Remove id from budgetProfile
export const dummyUserProfile: UserProfile = {
  id: "",
  accountName: "My Bank Ltd.",
  isActive: true,
  startingBalance: "10000.00",
  monthlyBudget: "2000.00",
}

export const dummyBudget: UserBudget = {
  needs: 50,
  savings: 20,
  wants: 30
}

// Set date to wanted month date
export const dummyIncomes: Expense[] = [
  {
    amount: "1500.00",
    category: "salary",
    date: new Date(),
    description: "This month salary",
    expenseType: 2,
    categoryType: 3
  },
  {
    amount: "200.00",
    category: "business",
    date: new Date(),
    description: "Business sales",
    expenseType: 2,
    categoryType: 3
  },
  {
    amount: "300.00",
    category: "extraincome",
    date: new Date(),
    description: "Business sales",
    expenseType: 2,
    categoryType: 3
  },
]
export const dummyExpenses: Expense[] = [
  {
    amount: "100.00",
    category: "entertainment",
    date: new Date(),
    description: "Paypal Spotify",
    expenseType: 1,
    categoryType: 2
  },
  {
    amount: "50.00",
    category: "restaurants",
    date: new Date(),
    description: "Mantova Restaurant",
    expenseType: 1,
    categoryType: 2
  },
  {
    amount: "400.00",
    category: "utilities",
    date: new Date(),
    description: "Rent",
    expenseType: 1,
    categoryType: 1
  },
  {
    amount: "250.00",
    category: "transport",
    date: new Date(),
    description: "Car loan",
    expenseType: 1,
    categoryType: 1
  },
  {
    amount: "70.00",
    category: "health",
    date: new Date(),
    description: "Medical doctor",
    expenseType: 1,
    categoryType: 1
  },
  {
    amount: "130.00",
    category: "gifts",
    date: new Date(),
    description: "Fine gift",
    expenseType: 1,
    categoryType: 2
  },
  {
    amount: "100.00",
    category: "entertainment",
    date: new Date(),
    description: "Paypal Spotify",
    expenseType: 1,
    categoryType: 2
  },
  {
    amount: "20.00",
    category: "general",
    date: new Date(),
    description: "Tobacco",
    expenseType: 1,
    categoryType: 2
  },
  {
    amount: "100.00",
    category: "restaurants",
    date: new Date(),
    description: "Eating out",
    expenseType: 1,
    categoryType: 2
  },
  {
    amount: "100.00",
    category: "health",
    date: new Date(),
    description: "Hair care",
    expenseType: 1,
    categoryType: 1
  },
  {
    amount: "100.00",
    category: "restaurants",
    date: new Date(),
    description: "Work lunches",
    expenseType: 1,
    categoryType: 2
  },
  {
    amount: "100.00",
    category: "transport",
    date: new Date(),
    description: "Fuel",
    expenseType: 1,
    categoryType: 2
  },
  {
    amount: "100.00",
    category: "transport",
    date: new Date(),
    description: "Milan Metro",
    expenseType: 1,
    categoryType: 2
  },
  {
    amount: "100.00",
    category: "services",
    date: new Date(),
    description: "Gym subscription",
    expenseType: 1,
    categoryType: 2
  },
  {
    amount: "100.00",
    category: "groceries",
    date: new Date(),
    description: "Groceries",
    expenseType: 1,
    categoryType: 1
  },
  {
    amount: "100.00",
    category: "entertainment",
    date: new Date(),
    description: "Guitar lessons",
    expenseType: 1,
    categoryType: 2
  },
  {
    amount: "100.00",
    category: "groceries",
    date: new Date(),
    description: "Pet food",
    expenseType: 1,
    categoryType: 1
  },
  {
    amount: "100.00",
    category: "shopping",
    date: new Date(),
    description: "New headphones",
    expenseType: 1,
    categoryType: 2
  },
  {
    amount: "100.00",
    category: "shopping",
    date: new Date(),
    description: "Zara",
    expenseType: 1,
    categoryType: 2
  },
]

