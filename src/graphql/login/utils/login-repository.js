export const loginFn = async (data, dataSource) => {
  const { userName, password } = data;
  return {
    userName,
    password,
  };
};
