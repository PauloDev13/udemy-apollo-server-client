const users = async (_, __, { getUsers }) => {
  const users = await getUsers();
  return users.json();
};

const user = async (_, { id, teste }, { getUsers }) => {
  console.log(teste);
  const user = await getUsers(id);
  return user.json();
};

export const userResolvers = {
  Query: {
    user,
    users,
  },
};
