const users = async (_, { input }, { getUsers }) => {
  const apiFilterInput = new URLSearchParams(input);

  const users = await getUsers(`?${apiFilterInput}`);
  return users.json();
};

const user = async (_, { id }, { getUsers }) => {
  const user = await getUsers(id);
  return user.json();
};

export const userResolvers = {
  Query: {
    user,
    users,
  },
};
