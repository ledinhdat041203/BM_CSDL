import axiosInstance from "./AxiosInstance";

const findAllProfile = async () => {
  const response = await axiosInstance.get("/profile/find-all", {});
  return response.data;
};

const findAllProfileName = async () => {
  const response = await axiosInstance.get("/profile/find-all-name", {});
  return response.data;
};

const createProfileAPI = async (profile) => {
  const response = await axiosInstance.post("/profile/create", { ...profile });
  console.log("response", response);
  return response.data;
};

const updateProfileAPI = async (profile) => {
  const response = await axiosInstance.post("/profile/update", { ...profile });
  console.log("response", response);
  return response.data;
};

const deleteProfileAPI = async (profileName) => {
  const response = await axiosInstance.post(
    "/profile/delete",
    {},
    {
      params: { profileName },
    }
  );
  return response.data;
};
export {
  findAllProfile,
  findAllProfileName,
  createProfileAPI,
  deleteProfileAPI,
  updateProfileAPI,
};
