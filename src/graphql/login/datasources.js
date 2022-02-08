import { RESTDataSource } from 'apollo-datasource-rest';
import bcrypt from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { AuthenticationError } from 'apollo-server';

export class LoginApi extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = process.env.API_URL;
  }

  async login(userName, password) {
    console.log(userName + ' - ' + password);
    const user = await this.get(
      '/users',
      { userName },
      {
        cacheOptions: {
          ttl: 0,
        },
      },
    );

    const found = !!user.length;
    if (!found) {
      throw new AuthenticationError('Usuário ou senha inválido');
    }

    const { passwordHash, id: userId } = user[0];

    const isPasswordValid = await this.checkUserPassword(
      password,
      passwordHash,
    );

    if (!isPasswordValid) {
      throw new AuthenticationError('Usuário ou senha inválido');
    }

    const token = this.createJwtToken({ userId });
    return {
      userId,
      token,
    };
  }

  // MÉTODOS AUXILIARES

  // checa se a senha está correta
  checkUserPassword(password, passwordHash) {
    console.log(passwordHash + ' - ' + password);
    return bcrypt.compare(password, passwordHash);
  }

  // cria o token
  createJwtToken(payload) {
    return sign(payload, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });
  }
}
