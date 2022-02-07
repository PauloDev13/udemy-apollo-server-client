import { gql } from 'apollo-server-core';

export const userTypeDefs = gql`
  extend type Query {
    user(id: ID!): User!
    users(input: apiFiltersInput): [User!]!
  }

  extend type Mutation {
    createUser(userData: CreateUserInput!): User!
    updateUser(userId: ID!, userData: UpdateUserInput!): User!
    deleteUser(userId: ID!): Boolean!
  }

  type User {
    id: ID!
    firstName: String!
    lastName: String!
    userName: String!
    indexRef: Int!
    createdAt: String!
    posts: [Post!]!
  }

  input CreateUserInput {
    firstName: String!
    lastName: String!
    userName: String!
  }

  input UpdateUserInput {
    firstName: String
    lastName: String
    userName: String
  }
`;
