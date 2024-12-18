import axiosInstance from "./AxiosInstance";

const findAllProfile = async () => {
  const response = await axiosInstance.get("/profile/find-all", {});
  return response.data;
};

export { findAllProfile };
