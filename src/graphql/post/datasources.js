import { RESTDataSource } from 'apollo-datasource-rest';
import { makePostsDataloader } from './dataloader';
import { createPostFn, updatePostFn } from './utils/post-repository';

export class PostsApi extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = process.env.API_URL;
    this.dataLoader = makePostsDataloader(this.getPosts.bind(this));
  }

  async getPosts(urlParams = {}) {
    return this.get('/posts', urlParams, {
      cacheOptions: {
        ttl: 60,
      },
    });
  }

  async getPost(id) {
    return this.get(`/posts/${id}`, undefined, {
      cacheOptions: {
        ttl: 60,
      },
    });
  }

  async createPost(input) {
    return createPostFn(input, this);
  }

  async updatePost(postId, input) {
    return updatePostFn(postId, input, this);
  }
}
