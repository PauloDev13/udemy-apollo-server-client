import { ApolloServer, gql } from 'apollo-server';

const server = new ApolloServer({
  typeDefs: gql`
    type Query {
      id: ID
      name: String
      age: Int
      average: Float
      married: Boolean
      arrayString: [String]
    }
  `,

  resolvers: {
    Query: {
      id: () => '1456',
      name: () => 'Fernanda',
      age: () => 7,
      average: () => 5.67,
      married: () => false,
      arrayString: () => ['A', 'B'],
    },
  },
});

server
  .listen(4003)
  .then(({ url }) => console.log(`Server listening on ${url}`));
