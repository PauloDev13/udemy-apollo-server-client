import { verify } from 'jsonwebtoken';
import { cookieParser } from '../schema/login/utils/cookies-parser';
import { UsersApi } from '../schema/user/datasources';

export const context = async ({ req, res, connection }) => {
  const regOrConnection = req || connection?.context?.req;

  let loggedUserId = await authorizeUserBearerToken(regOrConnection);

  if (!loggedUserId) {
    if (
      regOrConnection &&
      regOrConnection.headers &&
      regOrConnection.headers.cookie
    ) {
      const { jwtToken } = cookieParser(regOrConnection.headers.cookie);
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
  if (!req || !req.headers || !req.headers.authorization) return '';

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
