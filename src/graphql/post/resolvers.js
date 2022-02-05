const post = () => {
  return {
    id: '1',
    comments: ['Muito bom', 'Excelente post'],
  };
};

const posts = () => {
  return [
    {
      id: '1',
      comments: ['Muito bom', 'Excelente post', 'Bolsonaro 22'],
    },
    {
      id: '2',
      comments: ['Não gostei', 'Mais ou menos'],
    },
  ];
};

export const postResolvers = {
  Query: {
    post,
    posts,
  },
};
