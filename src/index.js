import { ApolloServer } from 'apollo-server';
import { context } from './graphql/context';
import { PostsApi } from './graphql/post/datasources';
import { typeDefs, resolvers } from './graphql/schema';

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context,
  dataSources: () => {
    return {
      postsAPI: new PostsApi(),
    };
  },
});

server
  .listen(4003)
  .then(({ url }) => console.log(`Server listening on ${url}`));
