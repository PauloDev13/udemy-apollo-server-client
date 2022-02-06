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
const createPost = (_, { input }, { dataSources }) => {
  return dataSources.postsAPI.createPost(input);
};

const updatePost = (_, { postId, input }, { dataSources }) => {
  return dataSources.postsAPI.updatePost(postId, input);
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
    updatePost,
  },

  Post: {
    user,
  },
};
