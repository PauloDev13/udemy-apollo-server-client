import { RESTDataSource } from 'apollo-datasource-rest';
import { makePostsDataloader } from './dataloader';

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
}
