const users = async (_, { input }, { getUsers }) => {
  const apiFilterInput = new URLSearchParams(input);

  const users = await getUsers(`?${apiFilterInput}`);
  return users.json();
};

const user = async (_, { id }, { getUsers }) => {
  const user = await getUsers(id);
  return user.json();
};

const posts = async ({ id }, __, { postsDataLoader }) => {
  return postsDataLoader.load(id);
};

export const userResolvers = {
  Query: {
    user,
    users,
  },

  User: {
    posts,
  },
};
