import { ApolloServer, gql } from 'apollo-server';

const server = new ApolloServer({
  typeDefs: gql`
    type Query {
      user: User!
      users: [User!]!
    }
    type User {
      id: ID!
      username: String!
    }
  `,

  resolvers: {
    Query: {
      user: () => {
        return {
          id: 'HOdjl12',
          username: 'prmorais',
        };
      },
      users: () => {
        return [
          {
            id: 'HOdjl12',
            username: 'prmorais',
          },
          {
            id: 'Jodke',
            username: 'nanda',
          },
        ];
      },
    },
  },
});

server
  .listen(4003)
  .then(({ url }) => console.log(`Server listening on ${url}`));
