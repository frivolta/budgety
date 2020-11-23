// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/firestore";
import { attachCustomCommands } from "cypress-firebase";

const fbConfig = {
  apiKey: "AIzaSyDQZs2_OC0Q7kem5Uy27RS3iX9I6ezAjfs",
  authDomain: "budgety-v5.firebaseapp.com",
  databaseURL: "https://budgety-v5.firebaseio.com",
  projectId: "budgety-v5",
  storageBucket: "budgety-v5.appspot.com",
  messagingSenderId: "1004978960871",
  appId: "1:1004978960871:web:8b4f236934513bc0da6542",
  measurementId: "G-L2WW7LNYZN",
};

firebase.initializeApp(fbConfig);

attachCustomCommands({ Cypress, cy, firebase });
// Fill fields and click signup button
export const signupUser = (user) => {
  cy.get('input[name="email"]').click().type(user.email);
  cy.get('input[name="password"]').click().type(user.password);
  cy.get('input[name="confirmPassword"]').click().type(user.password);
  cy.get("button").contains("Sign up").click();
};
Cypress.Commands.add("signupUser", signupUser);

// Fill fields and click signup button
export const signinUser = (user) => {
  cy.get('input[name="email"]').click().type(user.email);
  cy.get('input[name="password"]').click().type(user.password);
  cy.get("button").contains("Sign in").click();
};
Cypress.Commands.add("signinUser", signinUser);
Cypress.Commands.add("getTest", (s) => cy.get(`[data-testid=${s}]`));
