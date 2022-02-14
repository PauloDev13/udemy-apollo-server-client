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
  subscriptions: {
    onConnect: (connectParams, ws, _context) => {
      return {
        req: ws.upgradeReq,
      };
    },
  },
});

const port = process.env.PORT | 4003;

server
  .listen(port)
  .then(({ url }) => console.log(`Server listening on ${url}`));
