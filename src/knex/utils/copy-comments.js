// import { knex } from '../index';
// import { comments } from '../../../db.json';
// import { dateISOToMySQL } from './date-iso-to-mysql';

// const commentsForDb = comments.map((data) => {
//   return {
//     comment: data.comment,
//     user_id: data.userId,
//     post_id: data.postId,
//     created_at: dateISOToMySQL(data.createdAt),
//   };
// });

// knex('comments')
//   .insert(commentsForDb)
//   .then((res) => {
//     console.log(res);
//   })
//   .catch((e) => console.log(e))
//   .finally(() => knex.destroy());
