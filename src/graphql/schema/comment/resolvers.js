const createComment = async (_, { data }) => {
  const { comment, postId } = data;
  console.log(comment, postId);
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
