import { verify } from 'jsonwebtoken';

export const context = ({ req }) => {
  const loggedUseId = authorizeUser(req);
  return {
    loggedUseId,
  };
};

// MÉTODOS AUXILIARES
const authorizeUser = (req) => {
  const { authorization } = req.headers;

  try {
    const [_bearer, token] = authorization.split(' ');
    const { userId } = verify(token, process.env.JWT_SECRET);

    return userId;
  } catch (error) {
    return '';
  }
};
