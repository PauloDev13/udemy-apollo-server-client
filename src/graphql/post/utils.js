export const getUtilsPosts =
  (fetch) =>
  (path = '') =>
    fetch(`${process.env.API_URL}/posts/${path}`);
