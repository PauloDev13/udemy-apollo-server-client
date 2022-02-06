import fetch from 'node-fetch';
import { getUtilsPosts } from './post/utils';
import { makeUserDataLoader } from './user/dataloader';
import { getUtilsUsers } from './user/utils';

const getUsers = getUtilsUsers(fetch);
const getPosts = getUtilsPosts(fetch);

export const context = () => {
  return {
    userDataLoader: makeUserDataLoader(getUsers),
    getUsers: getUsers,
    getPosts: getPosts,
  };
};
