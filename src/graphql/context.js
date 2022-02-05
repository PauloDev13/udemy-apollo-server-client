import fetch from 'node-fetch';
import { makePostsDataloader } from './post/dataloader';
import { getUtilsPosts } from './post/utils';
import { makeUserDataLoader } from './user/dataloader';
import { getUtilsUsers } from './user/utils';

const getUsers = getUtilsUsers(fetch);
const getPosts = getUtilsPosts(fetch);

export const context = () => {
  return {
    userDataLoader: makeUserDataLoader(getUsers),
    postsDataLoader: makePostsDataloader(getPosts),
    getUsers: getUsers,
    getPosts: getPosts,
  };
};
