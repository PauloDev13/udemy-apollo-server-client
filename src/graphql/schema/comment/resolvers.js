import { isLoggedIn } from '../login/utils/auth-functions';

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

const user = async ({ user_id }, _, { dataSources }) => {
  const user = await dataSources.usersAPI.batchLoadById(user_id);
  return user;
};

export const commentResolvers = {
  Mutation: {
    createComment,
  },

  Comment: { user },
};
