export enum SIGNUP_ERRORS {
  required = "Required",
  invalidEmail = "Email not valid",
  invalidPassword = "Password not strong enough",
  passwordRequired = "Please enter your password",
  confirmPasswordRequired = "Please confirm your password",
  passwordMatch = "Passwords must match",
  signupErrorFromCognito = "Email already registered",
  genericError = "Oops, something went wrong...",
  confirmationCodeError = "Oops, we can't validate your code...",
}

export enum LOGIN_ERRORS {
  required = "Required",
  genericError = "Oops, something went wrong...",
}

export enum SIGNUP_SUCCESS {
  success = "You succesfully signed up!",
  confirmSucces = "Your email is confirmed!",
}

export enum LOGIN_SUCCESS {
  success = "You succesfully signed in!",
}

export enum LOGOUT_SUCCESS {
  success = "You are now logged out",
}

export enum LOGOUT_ERRORS {
  genericError = "Oops, an error occoured try again later",
}

export enum EDIT_SETTINGS_ERROR {
  balanceNameRequired = "An account name is required",
  startingBalance = "A starting balance is required",
  monthlyBudget = "A monthly budget is required",
  genericError = "We couldn't update your profile, try again later...",
}

export enum EDIT_SETTINGS_SUCCESS {
  settingsUpdated = "Your profile has been updated!",
}

export enum EDIT_CATEGORIES_SUCCESS {
  settingsUpdated = "Category updated",
}

export enum ADD_EXPENSE_ERRORS {
  genericError = "We couldn't add your expense, try again later...",
}

export enum ADD_EXPENSE_SUCCESS {
  expenseAdded = "Expense saved!",
}

export enum DELETE_EXPENSE_SUCCESS {
  expenseDeleted = "Expense deleted!",
}

export enum DELETE_EXPENSE_ERROR {
  genericError = "Expense not deleted, please try again later...",
}

export enum BUDGET_ERRORS {
  globalThreshold = "You cannot have a budget over 100%",
  updateError = "Sorry, We couldn't update your budget :(",
}

export enum BUDGET_SUCCESS {
  updateSuccess = "Budget succesfully updated!",
}
