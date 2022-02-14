import { gql } from 'apollo-server-core';
import { apiFiltersResolvers } from './api-filters/resolvers';
import { apiFiltersTypeDefs } from './api-filters/typeDefs';
import { commentResolvers } from './comment/resolvers';
import { commentTypeDefs } from './comment/typeDefs';
import { loginResolvers } from './login/resolvers';
import { loginTypeDefs } from './login/typeDefs';
import { postResolvers } from './post/resolvers';
import { postTypeDefs } from './post/typeDefs';
import { userResolvers } from './user/resolvers';
import { userTypeDefs } from './user/typeDefs';

const rootTypeDefs = gql`
  type Query {
    _empty: Boolean
  }

  type Mutation {
    _empty: Boolean
  }

  type Subscription {
    _empty: Boolean
  }
`;

const rootResolvers = {
  Query: {
    _empty: () => true,
  },

  Mutation: {
    _empty: () => true,
  },

  Subscription: {
    _empty: () => true,
  },
};

export const typeDefs = [
  rootTypeDefs,
  userTypeDefs,
  postTypeDefs,
  apiFiltersTypeDefs,
  loginTypeDefs,
  commentTypeDefs,
];
export const resolvers = [
  rootResolvers,
  userResolvers,
  postResolvers,
  apiFiltersResolvers,
  loginResolvers,
  commentResolvers,
];
