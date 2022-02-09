// login
const login = async (_, { data }, { dataSources }) => {
  const { userName, password } = data;
  return await dataSources.loginAPI.login(userName, password);
};

const logout = async (_, { userName }, { dataSources }) => {
  return await dataSources.loginAPI.logout(userName);
};

export const loginResolvers = {
  Mutation: {
    login,
    logout,
  },
};
