import { ValidationError } from 'apollo-server';
import { SQLDatasource } from '../../datasource/sql/sql-datasource';

const commentReducer = (data) => {
  return {
    id: data.id,
    comment: data.comment,
    user_id: data.user_id,
    createdAt: new Date(data.created_at).toISOString(),
  };
};

export class CommentSQLDatasource extends SQLDatasource {
  async getById(id) {
    return this.db('comments').where('id', '=', id);
  }

  async getPostById(post_id) {
    const query = this.db('comments').where({ post_id });
    const comments = await query;
    return comments.map((comment) => commentReducer(comment));
  }

  async create({ userId, postId, comment }) {
    const partialComment = {
      user_id: userId,
      post_id: postId,
      comment,
    };

    const exists = await this.db('comments').where(partialComment);
    if (exists.length > 0) {
      throw new ValidationError('Comentário já existe');
    }

    const created = await this.db('comments').insert(partialComment);
    return {
      id: created[0],
      createdAt: new Date().toISOString(),
      ...partialComment,
    };
  }
}
