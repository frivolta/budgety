/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createTask = /* GraphQL */ `
  mutation CreateTask(
    $input: CreateTaskInput!
    $condition: ModelTaskConditionInput
  ) {
    createTask(input: $input, condition: $condition) {
      id
      title
      description
      status
      createdAt
      updatedAt
    }
  }
`;
export const updateTask = /* GraphQL */ `
  mutation UpdateTask(
    $input: UpdateTaskInput!
    $condition: ModelTaskConditionInput
  ) {
    updateTask(input: $input, condition: $condition) {
      id
      title
      description
      status
      createdAt
      updatedAt
    }
  }
`;
export const deleteTask = /* GraphQL */ `
  mutation DeleteTask(
    $input: DeleteTaskInput!
    $condition: ModelTaskConditionInput
  ) {
    deleteTask(input: $input, condition: $condition) {
      id
      title
      description
      status
      createdAt
      updatedAt
    }
  }
`;
export const createPrivateNote = /* GraphQL */ `
  mutation CreatePrivateNote(
    $input: CreatePrivateNoteInput!
    $condition: ModelPrivateNoteConditionInput
  ) {
    createPrivateNote(input: $input, condition: $condition) {
      id
      content
      createdAt
      updatedAt
      owner
    }
  }
`;
export const updatePrivateNote = /* GraphQL */ `
  mutation UpdatePrivateNote(
    $input: UpdatePrivateNoteInput!
    $condition: ModelPrivateNoteConditionInput
  ) {
    updatePrivateNote(input: $input, condition: $condition) {
      id
      content
      createdAt
      updatedAt
      owner
    }
  }
`;
export const deletePrivateNote = /* GraphQL */ `
  mutation DeletePrivateNote(
    $input: DeletePrivateNoteInput!
    $condition: ModelPrivateNoteConditionInput
  ) {
    deletePrivateNote(input: $input, condition: $condition) {
      id
      content
      createdAt
      updatedAt
      owner
    }
  }
`;
export const createAccountInformations = /* GraphQL */ `
  mutation CreateAccountInformations(
    $input: CreateAccountInformationsInput!
    $condition: ModelAccountInformationsConditionInput
  ) {
    createAccountInformations(input: $input, condition: $condition) {
      id
      accountName
      startingBalance
      monthlyBudget
      createdAt
      updatedAt
      owner
    }
  }
`;
export const updateAccountInformations = /* GraphQL */ `
  mutation UpdateAccountInformations(
    $input: UpdateAccountInformationsInput!
    $condition: ModelAccountInformationsConditionInput
  ) {
    updateAccountInformations(input: $input, condition: $condition) {
      id
      accountName
      startingBalance
      monthlyBudget
      createdAt
      updatedAt
      owner
    }
  }
`;
export const deleteAccountInformations = /* GraphQL */ `
  mutation DeleteAccountInformations(
    $input: DeleteAccountInformationsInput!
    $condition: ModelAccountInformationsConditionInput
  ) {
    deleteAccountInformations(input: $input, condition: $condition) {
      id
      accountName
      startingBalance
      monthlyBudget
      createdAt
      updatedAt
      owner
    }
  }
`;
