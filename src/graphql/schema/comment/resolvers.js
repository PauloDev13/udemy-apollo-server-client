import { PubSub, withFilter } from 'apollo-server';
import { isLoggedIn } from '../login/utils/auth-functions';

export const pubSub = new PubSub();
export const CREATED_COMMENT_TRIGGER = 'CREATED_COMMENT';

// MUTATIONS RESOLVERS
// create
const createComment = async (_, { data }, { dataSources, loggedUserId }) => {
  isLoggedIn(loggedUserId);

  const { postId, comment } = data;

  const post = await dataSources.postsAPI.getPost(postId);

  return dataSources.commentDb.create({
    postId,
    comment,
    userId: loggedUserId,
    postOwner: post?.userId || null,
  });
};

// FIELD RESOLVERS
// field user in comment
const user = async ({ user_id }, _, { dataSources }) => {
  const user = await dataSources.usersAPI.batchLoadById(user_id);
  return user;
};

const createdComment = {
  subscribe: withFilter(
    () => {
      return pubSub.asyncIterator([CREATED_COMMENT_TRIGGER]);
    },
    (payload, _variable, context) => {
      const hasPostOwner = payload.postOwner !== null;
      const postOwnerIsLoggedUser = payload.postOwner === context.loggedUserId;
      const shouldNotifyUser = hasPostOwner && postOwnerIsLoggedUser;
      return shouldNotifyUser;
    },
  ),
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
