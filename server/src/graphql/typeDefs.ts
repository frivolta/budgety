import { gql } from "apollo-server-express";

export const typeDefs = gql`
  type User {
    _id: ID!
    firebaseUid: String!
    email: String!
    accountName: String!
    startingBalance: Float!
    monthlyBudget: Float!
  }

  type Query {
    user: String!
  }
  type Mutation {
    signup: String!
  }
`;
