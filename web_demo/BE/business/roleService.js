const {
  createRoleRepo,
  updateRoleRepo,
  deleteRoleRepo,
  findAllRoleRepo,
  findAllRoleNameRepo,
  findAllRoleAndUserRepo,
  findRoleNameRepo,
} = require("../data/roleRepository");

async function createRole(role) {
  try {
    const result = await createRoleRepo(role);
    return result;
  } catch (err) {
    throw new Error(err.message || "Error creating user");
  }
}

async function updateRole(role) {
  try {
    const result = await updateRoleRepo(role);
    return result;
  } catch (err) {
    throw new Error(err.message || "Error update user");
  }
}

async function deleteRole(roleName) {
  try {
    const result = await deleteRoleRepo(roleName);
    return result;
  } catch (err) {
    throw new Error(err.message || "Error delete user");
  }
}

async function findAllRole() {
  try {
    const result = await findAllRoleRepo();

    const listRole = result.map((role) => ({
      ROLE: role[0],
      ROLE_ID: role[1],
      PASSWORD_REQUIRED: role[2],
      AUTHENCATION_TYPE: role[3],
    }));
    return listRole;
  } catch (err) {
    throw new Error(err.message || "Error delete user");
  }
}

async function findAllRoleAndUser() {
  try {
    const result = await findAllRoleAndUserRepo();

    const listRole = result.map((role) => ({
      GRANTEE: role[0],
      GRANTED_ROLE: role[1],
      ADMIN_OPTION: role[2],
    }));
    return listRole;
  } catch (err) {
    throw new Error(err.message || "Error delete user");
  }
}

async function findAllRoleName() {
  try {
    const result = await findAllRoleNameRepo();
    return result;
  } catch (err) {
    throw new Error(err.message || "Error delete user");
  }
}

async function findRoleName() {
  try {
    const result = await findRoleNameRepo();
    const listRole = result.map((role) => role[0]);
    return listRole;
  } catch (err) {
    throw new Error(err.message || "Error delete user");
  }
}

module.exports = {
  createRole,
  updateRole,
  deleteRole,
  findAllRole,
  findAllRoleName,
  findAllRoleAndUser,
  findRoleName,
};
