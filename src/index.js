import { ApolloServer } from 'apollo-server';
import { knex } from './knex';
import { context } from './graphql/context';
import { LoginApi } from './graphql/schema/login/datasources';
import { UsersApi } from './graphql/schema/user/datasources';
import { PostsApi } from './graphql/schema/post/datasources';
import { typeDefs, resolvers } from './graphql/schema';
import { CommentSQLDatasource } from './graphql/schema/comment/datasources';

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context,
  dataSources: () => {
    return {
      postsAPI: new PostsApi(),
      usersAPI: new UsersApi(),
      loginAPI: new LoginApi(),
      commentDb: new CommentSQLDatasource(knex),
    };
  },
  cors: {
    origin: ['https://studio.apollographql.com', 'https://cdpn.io'],
    credentials: true,
  },
});

server
  .listen(4003)
  .then(({ url }) => console.log(`Server listening on ${url}`));
