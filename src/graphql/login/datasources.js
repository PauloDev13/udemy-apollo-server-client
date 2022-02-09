import { RESTDataSource } from 'apollo-datasource-rest';
import bcrypt from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { AuthenticationError } from 'apollo-server';
import { isLoggedOwner } from './utils/auth-functions';

export class LoginApi extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = process.env.API_URL;
  }

  // faz login na aplicação
  async login(userName, password) {
    const user = await this.getUser(userName);
    const { passwordHash, id: userId } = user[0];

    const isPasswordValid = await this.checkUserPassword(
      password,
      passwordHash,
    );

    if (!isPasswordValid) {
      throw new AuthenticationError('Usuário ou senha inválido');
    }

    const token = this.createJwtToken({ userId });
    await this.patch(
      `/users/${userId}`,
      { token },
      {
        cacheOptions: { ttl: 0 },
      },
    );
    return {
      userId,
      token,
    };
  }

  // faz logout na aplicação
  async logout(userName) {
    const user = await this.getUser(userName);
    const { id: userId } = user[0];
    isLoggedOwner(userId, this.context.loggedUserId);

    await this.patch(
      `/users/${userId}`,
      { token: '' },
      { cacheOptions: { ttl: 0 } },
    );
    return true;
  }

  // MÉTODOS AUXILIARES
  // checa se a senha está correta
  checkUserPassword(password, passwordHash) {
    return bcrypt.compare(password, passwordHash);
  }

  // cria o token
  createJwtToken(payload) {
    return sign(payload, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });
  }

  async getUser(userName) {
    console.log('USER NAME GET ' + userName);
    const user = await this.get(
      '/users',
      { userName },
      { cacheOptions: { ttl: 0 } },
    );
    const found = !!user.length;

    if (!found) {
      throw new AuthenticationError('Usuário inválido');
    }
    return user;
  }
}
