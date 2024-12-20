import axiosInstance from "./AxiosInstance";

const loginAPI = async (dataLogin) => {
  const response = await axiosInstance.post("/auth/login", { ...dataLogin });
  return response.data;
};

export { loginAPI };
