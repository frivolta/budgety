/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateTask = /* GraphQL */ `
  subscription OnCreateTask {
    onCreateTask {
      id
      title
      description
      status
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateTask = /* GraphQL */ `
  subscription OnUpdateTask {
    onUpdateTask {
      id
      title
      description
      status
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteTask = /* GraphQL */ `
  subscription OnDeleteTask {
    onDeleteTask {
      id
      title
      description
      status
      createdAt
      updatedAt
    }
  }
`;
export const onCreatePrivateNote = /* GraphQL */ `
  subscription OnCreatePrivateNote($owner: String!) {
    onCreatePrivateNote(owner: $owner) {
      id
      content
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onUpdatePrivateNote = /* GraphQL */ `
  subscription OnUpdatePrivateNote($owner: String!) {
    onUpdatePrivateNote(owner: $owner) {
      id
      content
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onDeletePrivateNote = /* GraphQL */ `
  subscription OnDeletePrivateNote($owner: String!) {
    onDeletePrivateNote(owner: $owner) {
      id
      content
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onCreateAccountInformations = /* GraphQL */ `
  subscription OnCreateAccountInformations($owner: String!) {
    onCreateAccountInformations(owner: $owner) {
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
export const onUpdateAccountInformations = /* GraphQL */ `
  subscription OnUpdateAccountInformations($owner: String!) {
    onUpdateAccountInformations(owner: $owner) {
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
export const onDeleteAccountInformations = /* GraphQL */ `
  subscription OnDeleteAccountInformations($owner: String!) {
    onDeleteAccountInformations(owner: $owner) {
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
