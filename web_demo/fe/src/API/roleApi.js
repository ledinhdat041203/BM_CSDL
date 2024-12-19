import axiosInstance from "./AxiosInstance";

const findAllRole = async () => {
  const response = await axiosInstance.get("/role/find-all", {});
  return response.data;
};

const findAllRoleAndUser = async () => {
  const response = await axiosInstance.get("/role/find-all-role-user", {});
  return response.data;
};

const findAllRoleName = async () => {
  const response = await axiosInstance.get("/role/find-all-name", {});
  return response.data;
};

const createRoleAPI = async (role) => {
  const response = await axiosInstance.post("/role/create", { ...role });
  return response.data;
};

const updateRoleAPI = async (role) => {
  let response;
  console.log("nhanh kne", role);
  if (!role.password) {
    response = await axiosInstance.post("/role/update", {
      roleName: role.roleName,
    });
  } else response = await axiosInstance.post("/role/update", { ...role });
  return response.data;
};

export {
  findAllRole,
  findAllRoleName,
  findAllRoleAndUser,
  createRoleAPI,
  updateRoleAPI,
};
