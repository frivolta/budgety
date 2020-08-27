export enum SIGNUP_ERRORS {
  required = "Required",
  invalidEmail = "Email not valid",
  invalidPassword = "Password not strong enough",
  passwordRequired = "Please enter your password",
  confirmPasswordRequired = "Please confirm your password",
  passwordMatch = "Passwords must match",
  genericError = "Oops, something went wrong...",
}

export enum LOGIN_ERRORS {
  required = "Required",
  genericError = "Oops, something went wrong...",
}

export enum SIGNUP_SUCCESS {
  success = "You succesfully signed up!",
}

export enum LOGIN_SUCCESS {
  success = "You succesfully signed in!",
}
