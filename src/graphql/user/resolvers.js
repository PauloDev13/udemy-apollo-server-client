const users = async (_, { input }, { dataSources }) => {
  var users = dataSources.usersAPI.getUsers(input);
  return users;
};

const user = async (_, { id }, { dataSources }) => {
  const user = dataSources.usersAPI.getUser(id);
  return user;
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
