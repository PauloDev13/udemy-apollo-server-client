const posts = async (_, { input }, { dataSources }) => {
  var posts = dataSources.postsAPI.getPosts(input);
  return posts;
};

const post = async (_, { id }, { dataSources }) => {
  var post = dataSources.postsAPI.getPost(id);
  return post;
};

const user = async ({ userId }, __, { dataSources }) => {
  const { dataLoader } = dataSources.usersAPI;
  return dataLoader.load(userId);
};

export const postResolvers = {
  Query: {
    post,
    posts,
  },

  Post: {
    user,
  },
};
