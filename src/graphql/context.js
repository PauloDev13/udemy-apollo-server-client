import fetch from 'node-fetch';
import { getUtilsPosts } from './post/utils';
import { makeUserDataLoader } from './user/dataloader';
import { getUtilsUsers } from './user/utils';

export const context = () => {
  return {
    userDataLoader: makeUserDataLoader(getUtilsUsers(fetch)),
    getUsers: getUtilsUsers(fetch),
    getPosts: getUtilsPosts(fetch),
  };
};
