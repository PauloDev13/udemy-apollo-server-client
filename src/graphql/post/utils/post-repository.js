import { ValidationError } from 'apollo-server';

// CRIA Post
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

// ATUALIZA Post
export const updatePostFn = async (postId, postData, dataSource) => {
  if (!postId) {
    throw new ValidationError('Para atualizar um Post informe seu ID');
  }

  await postExist(postId, dataSource);

  const { title, body, userId } = postData;

  if (typeof title !== 'undefined') {
    if (!title) {
      throw new ValidationError('O título deve ser informado');
    }
  }

  if (typeof body !== 'undefined') {
    if (!body) {
      throw new ValidationError('O conteúdo deve ser informado');
    }
  }

  if (typeof userId !== 'undefined') {
    if (!userId) {
      throw new ValidationError('O ID do usuário deve ser informado');
    }
    await userExist(userId, dataSource);
  }

  // if (postData?.userId) {
  //   await userExist(postData.userId, dataSource);
  // }

  return await dataSource.patch(`/posts/${postId}`, { ...postData });
};

// DELETA Post
export const deletePostFn = async (postId, dataSource) => {
  if (!postId) {
    throw new ValidationError(
      'Para excluir um Post, é preciso informar seu ID',
    );
  }

  await postExist(postId, dataSource);

  var deleted = await dataSource.delete(`/posts/${postId}`);
  return !!deleted;
};

const postExist = async (postId, dataSource) => {
  try {
    await dataSource.context.dataSources.postsAPI.get(`/posts/${postId}`);
  } catch (error) {
    throw new ValidationError(`Post com ID: ${postId} não encontrado`);
  }
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
