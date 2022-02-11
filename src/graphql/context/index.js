import { verify } from 'jsonwebtoken';
import { cookieParser } from '../schema/login/utils/cookies-parser';
import { UsersApi } from '../schema/user/datasources';

export const context = async ({ req, res }) => {
  let loggedUserId = await authorizeUserBearerToken(req);

  if (!loggedUserId) {
    if (req.headers.cookie) {
      const { jwtToken } = cookieParser(req.headers.cookie);
      loggedUserId = await verifyJwtToken(jwtToken);
    }
  }

  return {
    loggedUserId,
    res,
  };
};

// MÉTODOS AUXILIARES
const verifyJwtToken = async (token) => {
  if (!token) {
    return;
  }

  try {
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
};

const authorizeUserBearerToken = async (req) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return;
  }

  try {
    const [_bearer, token] = authorization.split(' ');
    return await verifyJwtToken(token);
  } catch (error) {
    console.log(error);
    return '';
  }
};
