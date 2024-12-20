import axiosInstance from "./AxiosInstance";

const findAllUser = async () => {
  const response = await axiosInstance.get("/user/find-all", {});
  return response.data;
};

const findAllTableSpace = async () => {
  const response = await axiosInstance.get("/user/find-all-tablespace", {});
  return response.data;
};

const createUserAPI = async (user) => {
  const response = await axiosInstance.post("/user/create", { ...user });
  return response.data;
};

const updateUserAPI = async (user) => {
  const response = await axiosInstance.post("/user/update", { ...user });
  return response.data;
};

const deleteUserAPI = async (username) => {
  const response = await axiosInstance.post(
    "/user/delete",
    {},
    { params: { username } }
  );
  return response.data;
};

const findAllUserNameAPI = async () => {
  const response = await axiosInstance.get("/user/find-all-user-name", {});
  return response.data;
};

const findAllUserInfoAPI = async () => {
  const response = await axiosInstance.get("/user/find-all-user-info", {});
  return response.data;
};

export {
  findAllUser,
  findAllTableSpace,
  createUserAPI,
  deleteUserAPI,
  updateUserAPI,
  findAllUserNameAPI,
  findAllUserInfoAPI,
};
