import axiosInstance from "./AxiosInstance";

const findAllSysPermissionOfRoleAPI = async () => {
  const response = await axiosInstance.get(
    "/permission/find-all-sys-permission-of-role",
    {}
  );
  return response.data;
};

const findAllObjPermissionOfRoleAPI = async () => {
  const response = await axiosInstance.get(
    "/permission/find-all-obj-permission-of-role",
    {}
  );
  return response.data;
};

const findMyRoleAPI = async () => {
  const response = await axiosInstance.get("/permission/find-my-role", {});
  return response.data;
};

export {
  findAllSysPermissionOfRoleAPI,
  findAllObjPermissionOfRoleAPI,
  findMyRoleAPI,
};
