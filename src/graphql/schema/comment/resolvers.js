import { PubSub } from 'graphql-subscriptions';
import { isLoggedIn } from '../login/utils/auth-functions';

export const pubSub = new PubSub();
export const CREATED_COMMENT_TRIGGER = 'CREATED_COMMENT';

// MUTATIONS RESOLVERS
// create
const createComment = async (_, { data }, { dataSources, loggedUserId }) => {
  isLoggedIn(loggedUserId);

  const { postId, comment } = data;

  await dataSources.postsAPI.getPost(postId);

  return dataSources.commentDb.create({
    postId,
    comment,
    userId: loggedUserId,
  });
};

// FIELD RESOLVERS
// field user in comment
const user = async ({ user_id }, _, { dataSources }) => {
  const user = await dataSources.usersAPI.batchLoadById(user_id);
  return user;
};

const createdComment = {
  subscribe: () => pubSub.asyncIterator([CREATED_COMMENT_TRIGGER]),
};

export const commentResolvers = {
  Mutation: {
    createComment,
  },

  Subscription: {
    createdComment,
  },

  Comment: { user },
};
