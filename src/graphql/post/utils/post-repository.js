import { ValidationError } from 'apollo-server';

export const createPostFn = async (postData, dataSource) => {
  const postInfo = await createPostInfo(postData, dataSource);
  const { title, body, userId } = postInfo;

  if (!title || !body || !userId) {
    throw new ValidationError(
      'Informe o título, o conteúdo e o ID do usuário autor do Post',
    );
  }
  return await dataSource.post('/posts', { ...postInfo });
};

const userExist = async (userId, dataSource) => {
  try {
    await dataSource.context.dataSources.usersAPI.get(`/users/${userId}`);
  } catch (error) {
    throw new ValidationError(`Usuário com ID: ${userId} não encontrado`);
  }
};

const createPostInfo = async (postData, dataSource) => {
  const { title, body, userId } = postData;

  await userExist(userId, dataSource);

  const indexRefPost = await dataSource.get('/posts', {
    _limit: 1,
    _order: 'desc',
    _sort: 'indexRef',
  });

  const indexRef = indexRefPost[0].indexRef + 1;

  return {
    title,
    body,
    userId,
    indexRef,
    createdAt: new Date().toISOString(),
  };
};
