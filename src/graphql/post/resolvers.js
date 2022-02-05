const posts = async (_, { input }, { getPosts }) => {
  const apiFilterInput = new URLSearchParams(input);

  const response = await getPosts(`?${apiFilterInput}`);
  return response.json();
};

const post = async (_, { id }, { getPosts }) => {
  const response = await getPosts(id);
  return response.json();
};

const user = async ({ userId }, __, { userDataLoader }) => {
  return userDataLoader.load(userId);
};

export const postResolvers = {
  Query: {
    post,
    posts,
  },

  Post: {
    user,
  },
};
