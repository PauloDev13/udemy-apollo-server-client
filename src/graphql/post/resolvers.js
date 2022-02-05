const posts = async (_, { input }, { getPosts }) => {
  const apiFilterInput = new URLSearchParams(input);

  const response = await getPosts(`?${apiFilterInput}`);
  return response.json();
};

const post = async (_, { id }, { getPosts }) => {
  const response = await getPosts(id);
  const post = await response.json();

  if (Math.random() > 0.5) {
    return {
      statusCode: 500,
      message: `Servidor demorou muito para responder.`,
      timeout: 123,
    };
  }

  if (post.id === undefined) {
    return {
      statusCode: 404,
      message: `Post não encontrado para o ID: ${id}.`,
      postId: id,
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
      if (typeof obj.postId !== 'undefined') return 'PostNotFoundError';
      if (typeof obj.timeout !== 'undefined') return 'PostTimeoutError';
      if (typeof obj.id !== 'undefined') return 'Post';

      return null;
    },
  },

  PostError: {
    __resolveType: (obj) => {
      if (typeof obj.postId !== 'undefined') return 'PostNotFoundError';
      if (typeof obj.timeout !== 'undefined') return 'PostTimeoutError';

      return null;
    },
  },

  Post: {
    winTimestamps: () => {
      return 'Fernanda';
    },
  },
};
