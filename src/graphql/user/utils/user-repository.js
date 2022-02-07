import { ValidationError } from 'apollo-server';

// CRIA User
export const createUserFn = async (userData, dataSource) => {
  var userInfo = await createUserInfo(userData, dataSource);
  const { firstName, lastName, userName } = userInfo;

  if (!firstName || !lastName || !userName) {
    throw new ValidationError(
      'Informe Nome, Sobrenome e o Login do usuário para concluir o cadastro',
    );
  }

  var userFound = await isUserDuplicate(userName, dataSource);
  if (typeof userFound !== 'undefined') {
    throw new ValidationError(`Já existe um usuário com o Login ${userName}`);
  }

  return await dataSource.post('/users', { ...userInfo });
};

// ATUALIZA User
export const updateUserFn = async (userId, userData, dataSource) => {
  if (!userId)
    throw new ValidationError('Para atualizar um Usuário informe seu ID');

  await userExist(userId, dataSource);

  const { firstName, lastName, userName } = userData;

  if (typeof firstName !== 'undefined') {
    if (!firstName) {
      throw new ValidationError('O Nome deve ser informado');
    }
  }

  if (typeof lastName !== 'undefined') {
    if (!lastName) {
      throw new ValidationError('O Sobrenome deve ser informado');
    }
  }

  if (typeof userName !== 'undefined') {
    if (!userName) {
      throw new ValidationError('O Login deve ser informado');
    }
  }

  var userFound = await isUserDuplicate(userName, dataSource);
  if (typeof userFound !== 'undefined' && userFound.id !== userId) {
    throw new ValidationError(`Já existe um usuário com o Login ${userName}`);
  }

  return await dataSource.patch(`/users/${userId}`, { ...userData });
};

export const deleteUserFn = async (userId, dataSource) => {
  if (!userId)
    throw new ValidationError('Para excluir um Usuário informe seu ID');

  await userExist(userId, dataSource);

  var deleted = await dataSource.delete(`/users/${userId}`);
  return !!deleted;
};

// MÉTODOS AUXILIARES
const userExist = async (userId, dataSource) => {
  try {
    await dataSource.context.dataSources.usersAPI.get(`/users/${userId}`);
  } catch (error) {
    throw new ValidationError(`Usuário com ID: ${userId} não encontrado`);
  }
};

const isUserDuplicate = async (userName, dataSource) => {
  const found = await dataSource.get('/users', {
    userName,
  });
  return found[0];
};

const createUserInfo = async (userData, dataSource) => {
  // const { firstName, lastName, userName } = userData;

  const indexRefUser = await dataSource.get('/users', {
    _limit: 1,
    _order: 'desc',
    _sort: 'indexRef',
  });

  const indexRef = indexRefUser[0].indexRef + 1;

  return {
    ...userData,
    indexRef,
    createdAt: new Date().toISOString(),
  };
};
