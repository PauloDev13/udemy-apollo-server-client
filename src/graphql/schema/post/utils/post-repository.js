import { ValidationError } from 'apollo-server';
import { isLoggedIn, isLoggedOwner } from '../../login/utils/auth-functions';

// CRIA Post
export const createPostFn = async (postData, dataSource) => {
  var loggedUserId = dataSource.context.loggedUserId;

  isLoggedIn(loggedUserId);

  postData.userId = loggedUserId;

  const postInfo = await createPostInfo(postData, dataSource);
  const { title, body } = postInfo;

  if (!title || !body) {
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

  const userId = await postExist(postId, dataSource);
  const loggedUserId = dataSource.context.loggedUserId;
  isLoggedOwner(userId, loggedUserId);

  const { title, body } = postData;

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

  return await dataSource.patch(`/posts/${postId}`, { ...postData });
};

// DELETA Post
export const deletePostFn = async (postId, dataSource) => {
  if (!postId) {
    throw new ValidationError(
      'Para excluir um Post, é preciso informar seu ID',
    );
  }

  const userId = await postExist(postId, dataSource);

  var loggedUserId = dataSource.context.loggedUserId;
  isLoggedOwner(userId, loggedUserId);

  var deleted = await dataSource.delete(`/posts/${postId}`);
  return !!deleted;
};

// MÉTODOS AUXILIARES
// verifica se o post existe e se existir, retorna seu ID
const postExist = async (postId, dataSource) => {
  try {
    const postFound = await dataSource.context.dataSources.postsAPI.get(
      `/posts/${postId}`,
      undefined,
      {
        cacheOptions: {
          ttl: 0,
        },
      },
    );

    const { userId } = postFound;
    return userId;
  } catch (error) {
    throw new ValidationError(`Post com ID: ${postId} não encontrado`);
  }
};

// monta os dados que serão enviados para o BD
const createPostInfo = async (postData, dataSource) => {
  const indexRefPost = await dataSource.get('/posts', {
    _limit: 1,
    _order: 'desc',
    _sort: 'indexRef',
  });

  const indexRef = indexRefPost[0].indexRef + 1;

  return {
    ...postData,
    indexRef,
    createdAt: new Date().toISOString(),
  };
};
