// Query Resolvers
const posts = async (_, { input }, { dataSources }) => {
  var posts = dataSources.postsAPI.getPosts(input);
  return posts;
};

const post = async (_, { id }, { dataSources }) => {
  var post = dataSources.postsAPI.getPost(id);
  return post;
};

// Mutation Resolvers
const createPost = (_, args, { dataSources }) => {
  console.log(args);
  return {
    id: '49',
    title: 'Qui facere repellat dolor.',
    body: 'Distinctio atque amet doloribus vero doloremque et est nobis',
    userId: '247',
    indexRef: 11,
    createdAt: '2019-09-07T06:51:26.519Z',
  };
};

// Field Resolvers
const user = async ({ userId }, __, { dataSources }) => {
  const { dataLoader } = dataSources.usersAPI;
  return dataLoader.load(userId);
};

export const postResolvers = {
  Query: {
    post,
    posts,
  },

  Mutation: {
    createPost,
  },

  Post: {
    user,
  },
};
