import axiosInstance from "./AxiosInstance";

const findAllRole = async () => {
  const response = await axiosInstance.get("/role/find-all", {});
  return response.data;
};

export { findAllRole };
