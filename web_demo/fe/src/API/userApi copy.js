import axiosInstance from "./AxiosInstance";

const findAllUser = async () => {
  const response = await axiosInstance.get("/user/find-all", {});
  return response.data;
};

const findAllTableSpace = async () => {
  const response = await axiosInstance.get("/user/find-all-tablespace", {});
  return response.data;
};

export { findAllUser, findAllTableSpace };
