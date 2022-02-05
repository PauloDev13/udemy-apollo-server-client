const posts = async (_, { input }, { getPosts }) => {
  const apiFilterInput = new URLSearchParams(input);

  const response = await getPosts(`?${apiFilterInput}`);
  return response.json();
};

const post = async (_, { id }, { getPosts }) => {
  const response = await getPosts(id);
  const post = await response.json();
  console.log(post.id);

  if (post.id === undefined) {
    return {
      statusCode: 404,
      message: `Post não encontrado para o ID: ${id}.`,
    };
  }

  return post;
};

export const postResolvers = {
  Query: {
    post,
    posts,
  },

  PostResult: {
    __resolveType: (obj) => {
      console.log('OBJECT ' + typeof obj.statusCode);
      if (typeof obj.statusCode !== 'undefined') return 'PostNotFoundError';
      if (typeof obj.id !== 'undefined') return 'Post';

      return null;
    },
  },

  Post: {
    winTimestamps: () => {
      return 'Fernanda';
    },
  },
};
