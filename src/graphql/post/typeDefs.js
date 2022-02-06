import { gql } from 'apollo-server-core';

export const postTypeDefs = gql`
  extend type Query {
    post(id: ID!): Post!
    posts(input: apiFiltersInput): [Post!]!
  }

  extend type Mutation {
    createPost(input: CreatePostInput!): Post!
    updatePost(postId: ID!, input: UpdatePostInput!): Post!
  }

  type Post {
    id: ID!
    title: String!
    body: String!
    user: User!
    indexRef: Int!
    createdAt: String!
  }

  input CreatePostInput {
    title: String!
    body: String!
    userId: String!
  }

  input UpdatePostInput {
    title: String
    body: String
    userId: String
  }
`;
