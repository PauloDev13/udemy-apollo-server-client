import fetch from 'node-fetch';
import { getUtilsPosts } from './post/utils';
import { getUtilsUsers } from './user/utils';

const getUsers = getUtilsUsers(fetch);
const getPosts = getUtilsPosts(fetch);

export const context = () => {
  return {
    getUsers: getUsers,
    getPosts: getPosts,
  };
};
