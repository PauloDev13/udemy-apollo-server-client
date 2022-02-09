import { ValidationError, UserInputError } from 'apollo-server';
import bcrypt from 'bcrypt';
import { isLoggedOwner } from '../../login/utils/auth-functions';

// CRIA User
export const createUserFn = async (userData, dataSource) => {
  const { firstName, lastName, userName, password } = userData;

  const userInfo = await createUserInfo(userData, dataSource);

  if (!firstName || !lastName || !userName || !password) {
    throw new ValidationError(
      'Informe Nome, Sobrenome, Login e Senha do usuário para concluir o cadastro',
    );
  }

  validateUserPassword(password);

  const userFound = await isUserDuplicate(userName, dataSource);
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

  const loggedUserId = dataSource.context.loggedUserId;
  isLoggedOwner(userId, loggedUserId);

  const { firstName, lastName, userName, password } = userData;

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

  if (typeof password !== 'undefined') {
    if (!password) {
      throw new ValidationError('A Senha deve ser informado');
    } else {
      validateUserPassword(password);
    }
  }

  const userFound = await isUserDuplicate(userName, dataSource);
  if (typeof userFound !== 'undefined' && userFound.id !== userId) {
    throw new ValidationError(`Já existe um usuário com o Login ${userName}`);
  }

  await encryptPassword(userData);

  return await dataSource.patch(`/users/${userId}`, { ...userData });
};

// DELETE User
export const deleteUserFn = async (userId, dataSource) => {
  if (!userId)
    throw new ValidationError('Para excluir um Usuário informe seu ID');

  await userExist(userId, dataSource);

  const loggedUserId = dataSource.context.loggedUserId;
  isLoggedOwner(userId, loggedUserId);

  var deleted = await dataSource.delete(`/users/${userId}`);
  return !!deleted;
};

// MÉTODOS AUXILIARES

// verifica se o usuário existe no BD
const userExist = async (userId, dataSource) => {
  try {
    const user = await dataSource.context.dataSources.usersAPI.get(
      `/users/${userId}`,
      undefined,
      {
        cacheOptions: {
          ttl: 0,
        },
      },
    );
    console.log(user);
  } catch (error) {
    throw new ValidationError(`Usuário com ID: ${userId} não encontrado`);
  }
};

// verifica se já existe no BD usuário com o mesmo Login
const isUserDuplicate = async (userName, dataSource) => {
  const found = await dataSource.get('/users', {
    userName,
  });
  return found[0];
};

// valida a senha para que tenha letras maiúscula, minúsculas, números e entre
// 6 e 16 caracteres
const validateUserPassword = (password) => {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{6,15}$/;
  if (!password.match(passwordRegex)) {
    throw new UserInputError(
      'A Senha deve letras maiúsculas, minúsculas, números e 6 a 15 caracteres',
    );
  }
};

// atualiza os campos indexRef e createdAt antes de salvar e atualizar um usuário
const createUserInfo = async (userData, dataSource) => {
  await encryptPassword(userData);

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

// criptografa a senha, caso ela ainda não tenha sido criptografada e adiciona
// o campo passwordHash e exclui o cam password dos dados enviados para o BD
const encryptPassword = async (userData) => {
  if (userData.password && !userData.passwordHash) {
    const { password } = userData;
    const passwordHash = await bcrypt.hash(password, 12);
    userData.passwordHash = passwordHash;
    delete userData['password'];
  }
};
