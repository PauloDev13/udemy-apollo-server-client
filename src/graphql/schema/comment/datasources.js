import { ValidationError } from 'apollo-server';
import { SQLDatasource } from '../../datasource/sql/sql-datasource';
import { CREATED_COMMENT_TRIGGER, pubSub } from './resolvers';

const commentReducer = (data) => {
  return {
    id: data.id,
    comment: data.comment,
    user_id: data.user_id,
    createdAt: new Date(data.created_at).toISOString(),
  };
};

export class CommentSQLDatasource extends SQLDatasource {
  constructor(dbConnection) {
    super(dbConnection);
    this.tableName = 'comments';
  }

  async getById(id) {
    return this.db(this.tableName).where('id', '=', id);
  }

  async getPostById(post_id) {
    const query = this.db(this.tableName).where({ post_id });
    const comments = await query;
    return comments.map((comment) => commentReducer(comment));
  }

  async create({ userId, postId, comment }) {
    const partialComment = {
      user_id: userId,
      post_id: postId,
      comment,
    };

    const exists = await this.db(this.tableName).where(partialComment);
    if (exists.length > 0) {
      throw new ValidationError('Comentário já existe');
    }

    const created = await this.db(this.tableName).insert(partialComment);

    const commentToReturn = {
      id: created[0],
      createdAt: new Date().toISOString(),
      ...partialComment,
    };

    pubSub.publish(CREATED_COMMENT_TRIGGER, {
      createdComment: commentToReturn,
    });

    return commentToReturn;
  }

  async batchLoaderCallback(post_ids) {
    const query = this.db(this.tableName).whereIn('post_id', post_ids);
    const comments = await query;
    const filteredComments = post_ids.map((post_id) => {
      return comments
        .filter((comment) => String(comment.post_id) === String(post_id))
        .map((comment) => commentReducer(comment));
    });
    return filteredComments;
  }
}
