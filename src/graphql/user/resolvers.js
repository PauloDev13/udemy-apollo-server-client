const user = () => {
  return {
    id: '1',
    userName: 'prmorais',
  };
};

const users = () => {
  return [
    {
      id: '1',
      userName: 'prmorais',
    },
    {
      id: '2',
      userName: 'nanda',
    },
  ];
};

export const userResolvers = {
  Query: {
    user,
    users,
  },
};
