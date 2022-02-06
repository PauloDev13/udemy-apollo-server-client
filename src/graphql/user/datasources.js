import { RESTDataSource } from 'apollo-datasource-rest';
import { makeUserDataLoader } from './dataloader';

export class UsersApi extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = process.env.API_URL;
    this.dataLoader = makeUserDataLoader(this.getUsers.bind(this));
  }

  async getUsers(urlParams = {}) {
    return this.get('/users', urlParams, {
      cacheOptions: {
        ttl: 60,
      },
    });
  }

  async getUser(id) {
    return this.get(`/users/${id}`, undefined, {
      cacheOptions: {
        ttl: 60,
      },
    });
  }
}
