const {
  createUserRepo,
  findAllRepo,
  updateUserRepo,
  deleteUserRepo,
} = require("../data/userRepository");
const { use } = require("../routes/auth");

async function createUser(user) {
  try {
    const result = await createUserRepo(user);
    return result;
  } catch (err) {
    throw new Error(err.message || "Error creating user");
  }
}

async function updateUser(user) {
  try {
    const result = await updateUserRepo(user);
    return result;
  } catch (err) {
    throw new Error(err.message || "Error update user");
  }
}

async function deleteUser(username) {
  try {
    const result = await deleteUserRepo(username);
    return result;
  } catch (err) {
    throw new Error(err.message || "Error delete user");
  }
}

async function findAll() {
  try {
    const result = await findAllRepo();
    return result;
  } catch (err) {
    throw new Error(err.message || "Error creating user");
  }
}

module.exports = {
  createUser,
  findAll,
  updateUser,
  deleteUser,
};
