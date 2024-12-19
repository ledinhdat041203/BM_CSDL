const {
  grantSysPermissionRepo,
  grantObjectTablePermissionRepo,
  grantObjectPermissionRepo,
  revokeSysPermissionRepo,
  revokeObjectPermissionRepo,
  findAllSysPermissionRepo,
  findAllObjPermissionRepo,
  findAllSysPermissionOfRoleRepo,
  findAllObjPermissionOfRoleRepo,
  findMyRoleRepo,
} = require("../data/permissionRepository");

async function grantSysPermission(name, permissions, grantOption) {
  try {
    const result = await grantSysPermissionRepo(name, permissions, grantOption);
    return result;
  } catch (err) {
    throw new Error(err.message || "Error creating user");
  }
}

async function grantObjectPermission(name, permissions, table, grantOption) {
  try {
    const result = await grantObjectPermissionRepo(
      name,
      permissions,
      table,
      grantOption
    );
    return result;
  } catch (err) {
    throw new Error(err.message || "Error update user");
  }
}

async function revokeSysPermission(name, permissions) {
  try {
    const result = await revokeSysPermissionRepo(name, permissions);
    return result;
  } catch (err) {
    throw new Error(err.message || "Error creating user");
  }
}

async function revokeObjectPermission(name, permissions, table) {
  try {
    const result = await revokeObjectPermissionRepo(name, permissions, table);
    return result;
  } catch (err) {
    throw new Error(err.message || "Error update user");
  }
}

async function findAllSysPermission() {
  try {
    const result = await findAllSysPermissionRepo();
    return result;
  } catch (err) {
    throw new Error(err.message || "Error update user");
  }
}

async function findAllObjPermission() {
  try {
    const result = await findAllObjPermissionRepo();
    return result;
  } catch (err) {
    throw new Error(err.message || "Error update user");
  }
}

async function findAllSysPermissionOfRole() {
  try {
    const result = await findAllSysPermissionOfRoleRepo();
    const listRole = result.map((role) => ({
      ROLE: role[0],
      PRIVILEGE: role[1],
      ADMIN_OPTION: role[2],
    }));
    return listRole;
  } catch (err) {
    throw new Error(err.message || "Error update user");
  }
}

async function findAllObjPermissionOfRole() {
  try {
    const result = await findAllObjPermissionOfRoleRepo();
    const listRole = result.map((role) => ({
      ROLE: role[0],
      OWNER: role[1],
      TABLE_NAME: role[2],
      PRIVILEGE: role[4],
      GRANTABLE: role[5],
    }));
    return listRole;
  } catch (err) {
    throw new Error(err.message || "Error update user");
  }
}

async function findMyRole() {
  try {
    const result = await findMyRoleRepo();
    const listRole = result.map((role) => ({
      USERNAME: role[0],
      GRANTED_ROLE: role[1],
      ADMIN_OPTION: role[2],
    }));
    return listRole;
  } catch (err) {
    throw new Error(err.message || "Error update user");
  }
}

module.exports = {
  grantSysPermission,
  grantObjectPermission,
  revokeSysPermission,
  revokeObjectPermission,
  findAllSysPermission,
  findAllObjPermission,
  findAllSysPermissionOfRole,
  findAllObjPermissionOfRole,
  findMyRole,
};
