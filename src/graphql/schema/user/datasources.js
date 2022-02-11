import { RESTDataSource } from 'apollo-datasource-rest';
import { makeUserDataLoader } from './dataloader';
import {
  createUserFn,
  deleteUserFn,
  updateUserFn,
} from './utils/user-repository';

export class UsersApi extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = process.env.API_URL;
    this.dataLoader = makeUserDataLoader(this.getUsers.bind(this));
  }

  async getUsers(urlParams = {}) {
    return await this.get('/users', urlParams, {
      cacheOptions: {
        ttl: 60,
      },
    });
  }

  async getUser(id) {
    return await this.get(`/users/${id}`, undefined, {
      cacheOptions: {
        ttl: 60,
      },
    });
  }

  async createUser(userData) {
    return await createUserFn(userData, this);
  }

  async updateUser(userId, userData) {
    return await updateUserFn(userId, userData, this);
  }

  async deleteUser(userId) {
    return await deleteUserFn(userId, this);
  }

  async batchLoadById(id) {
    return this.dataLoader.load(id);
  }
}
