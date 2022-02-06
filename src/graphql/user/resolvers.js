const users = async (_, { input }, { getUsers }) => {
  const apiFilterInput = new URLSearchParams(input);

  const users = await getUsers(`?${apiFilterInput}`);
  return users.json();
};

const user = async (_, { id }, { getUsers }) => {
  const user = await getUsers(id);
  return user.json();
};

const posts = async ({ id }, __, { dataSources }) => {
  const { dataLoader } = dataSources.postsAPI;
  return dataLoader.load(id);
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
