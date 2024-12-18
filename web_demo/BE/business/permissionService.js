const {
  grantSysPermissionRepo,
  grantObjectTablePermissionRepo,
  grantObjectPermissionRepo,
  revokeSysPermissionRepo,
  revokeObjectPermissionRepo,
  findAllSysPermissionRepo,
  findAllObjPermissionRepo,
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

module.exports = {
  grantSysPermission,
  grantObjectPermission,
  revokeSysPermission,
  revokeObjectPermission,
  findAllSysPermission,
  findAllObjPermission,
};
