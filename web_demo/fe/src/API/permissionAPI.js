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

const grantSysPermissionAPI = async (data) => {
  const response = await axiosInstance.post(
    "/permission/grant-sys-permission",
    {
      ...data,
    }
  );
  return response.data;
};

const grantObjPermissionAPI = async (data) => {
  const response = await axiosInstance.post(
    "/permission/grant-obj-permission",
    {
      ...data,
    }
  );
  return response.data;
};

export {
  findAllSysPermissionOfRoleAPI,
  findAllObjPermissionOfRoleAPI,
  findMyRoleAPI,
  grantSysPermissionAPI,
  grantObjPermissionAPI,
};
