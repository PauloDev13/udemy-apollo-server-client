import { AuthenticationError } from 'apollo-server';

export const isLoggedOwner = (userId, loggedUserId) => {
  isLoggedIn(loggedUserId);

  if (loggedUserId !== userId) {
    throw new AuthenticationError(
      'Você não tem permissão para executar essa operação',
    );
  }
};

export const isLoggedIn = (loggedUserId) => {
  if (!loggedUserId) {
    throw new AuthenticationError('Faça login na aplicação.');
  }
};
