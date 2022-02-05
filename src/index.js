import { ApolloServer } from 'apollo-server';
import fetch from 'node-fetch';
import { typeDefs, resolvers } from './graphql/schema';

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: () => {
    return {
      fetch,
    };
  },
});

server
  .listen(4003)
  .then(({ url }) => console.log(`Server listening on ${url}`));
