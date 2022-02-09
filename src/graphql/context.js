import { verify } from 'jsonwebtoken';
import { UsersApi } from './user/datasources';

export const context = async ({ req }) => {
  const loggedUserId = await authorizeUser(req);
  return {
    loggedUserId,
  };
};

// MÉTODOS AUXILIARES
const authorizeUser = async (req) => {
  const { authorization } = req.headers;

  if (authorization) {
    try {
      const [_bearer, token] = authorization.split(' ');
      const { userId } = verify(token, process.env.JWT_SECRET);

      const usersAPI = new UsersApi();
      usersAPI.initialize({});
      const foundUser = await usersAPI.getUser(userId);

      if (foundUser.token !== token) return '';

      return userId;
    } catch (error) {
      console.log(error);
      return '';
    }
  }
};
