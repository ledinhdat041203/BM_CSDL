const {
  createRoleRepo,
  updateRoleRepo,
  deleteRoleRepo,
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

module.exports = { createRole, updateRole, deleteRole };
