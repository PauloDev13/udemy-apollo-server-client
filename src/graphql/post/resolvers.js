const posts = async (_, __, { getPosts }) => {
  const response = await getPosts();
  return response.json();
};
const post = async (_, { id }, { getPosts }) => {
  const response = await getPosts(id);
  return response.json();
};

export const postResolvers = {
  Query: {
    post,
    posts,
  },

  Post: {
    winTimestamps: () => {
      return 'Fernanda';
    },
  },
};
