// login
const login = async (_, { data }, { dataSources }) => {
  const { userName, password } = data;
  return await dataSources.loginAPI.login(userName, password);
};

export const loginResolvers = {
  Mutation: {
    login,
  },
};
