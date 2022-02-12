// QUERY RESOLVERS
// get all Posts
const posts = async (_, { input }, { dataSources }) => {
  var posts = dataSources.postsAPI.getPosts(input);
  return posts;
};

// get Post By Id
const post = async (_, { id }, { dataSources }) => {
  var post = dataSources.postsAPI.getPost(id);
  return post;
};

// MUTATIONS RESOLVERS
// create
const createPost = (_, { input }, { dataSources }) => {
  return dataSources.postsAPI.createPost(input);
};

// update
const updatePost = (_, { postId, input }, { dataSources }) => {
  return dataSources.postsAPI.updatePost(postId, input);
};

// delete
const deletePost = (_, { postId }, { dataSources }) => {
  return dataSources.postsAPI.deletePost(postId);
};

// FIELD RESOLVERS

// field user in Post
const user = async ({ userId }, __, { dataSources }) => {
  const { dataLoader } = dataSources.usersAPI;
  return dataLoader.load(userId);
};

const comments = async ({ id: post_id }, _, { dataSources }) => {
  return dataSources.commentDb.getPostById(post_id);
};

export const postResolvers = {
  Query: {
    post,
    posts,
  },

  Mutation: {
    createPost,
    updatePost,
    deletePost,
  },

  Post: {
    user,
    comments,
  },
};
