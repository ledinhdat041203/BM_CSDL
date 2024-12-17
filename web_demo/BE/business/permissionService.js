const {
  grantSysPermissionRepo,
  grantObjectTablePermissionRepo,
  grantObjectPermissionRepo,
} = require("../data/permissionRepository");

async function grantSysPermission(name, permissions) {
  try {
    const result = await grantSysPermissionRepo(name, permissions);
    return result;
  } catch (err) {
    throw new Error(err.message || "Error creating user");
  }
}

async function grantObjectPermission(name, permissions, table) {
  try {
    const result = await grantObjectPermissionRepo(name, permissions, table);
    return result;
  } catch (err) {
    throw new Error(err.message || "Error update user");
  }
}

module.exports = { grantSysPermission, grantObjectPermission };
