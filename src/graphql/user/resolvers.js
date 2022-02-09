// QUERY RESOLVERS
// get all Users
const users = async (_, { input }, { dataSources }) => {
  var users = await dataSources.usersAPI.getUsers(input);
  return users;
};

// get User By Id
const user = async (_, { id }, { dataSources }) => {
  const user = await dataSources.usersAPI.getUser(id);
  return user;
};

// MUTATIONS RESOLVERS
// create
const createUser = async (_, { userData }, { dataSources }) => {
  return await dataSources.usersAPI.createUser(userData);
};

const updateUser = async (_, { userId, userData }, { dataSources }) => {
  return await dataSources.usersAPI.updateUser(userId, userData);
};

const deleteUser = async (_, { userId }, { dataSources }) => {
  return await dataSources.usersAPI.deleteUser(userId);
};

// FIELD RESOLVERS
// field user in Post
const posts = async ({ id }, __, { dataSources }) => {
  const { dataLoader } = dataSources.postsAPI;
  return dataLoader.load(id);
};

export const userResolvers = {
  Query: {
    user,
    users,
  },

  Mutation: {
    createUser,
    updateUser,
    deleteUser,
  },

  User: {
    posts,
  },
};
