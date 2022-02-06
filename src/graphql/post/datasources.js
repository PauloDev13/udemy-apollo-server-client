import { RESTDataSource } from 'apollo-datasource-rest';

export class PostsApi extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = process.env.API_URL;
  }

  async getPosts(urlParams = {}) {
    return this.get('/posts', urlParams);
  }

  async getPost(id) {
    return this.get(`/posts/${id}`);
  }
}
