const {
  createUserRepo,
  findAllRepo,
  updateUserRepo,
  deleteUserRepo,
  findAllTableSpaceRepo,
  findAllUserNameRepo,
  findAllUserInfoRepo,
} = require("../data/userRepository");
const { use } = require("../routes/auth");

async function createUser(user) {
  try {
    user.quota = user.quota + "M";
    user.role = user.role[0];
    console.log("user serviec", user);
    const result = await createUserRepo(user);
    return result;
  } catch (err) {
    throw new Error(err.message || "Error creating user");
  }
}

async function updateUser(user) {
  try {
    user.quota = user.quota + "M";
    // user.role = user.role[0];
    console.log("user serviec", user);
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
    const listUsers = result.map((user) => ({
      USERNAME: user[0],
      ACCOUNT_STATUS: user[1],
      LOCK_DATE: user[2],
      CREATED: user[3],
      TEMPORARY_TABLESPACE: user[4],
      DEFAULT_TABLESPACE: user[5],
      PROFILE: user[6],
    }));
    return listUsers;
  } catch (err) {
    throw new Error(err.message || "Error creating user");
  }
}

async function findAllTableSpace(username) {
  try {
    const result = await findAllTableSpaceRepo(username);
    const defaultTablespace = result.defaultTablespace.map((space) => space[0]);
    const tempTablespace = result.tempTablespace.map((space) => space[0]);
    return { defaultTablespace, tempTablespace };
  } catch (err) {
    throw new Error(err.message || "Error delete user");
  }
}

async function findAllUserName() {
  try {
    const result = await findAllUserNameRepo();
    const listUsersName = result.map((user) => user[0]);
    return listUsersName;
  } catch (err) {
    throw new Error(err.message || "Error creating user");
  }
}

async function findAllUserInfo() {
  try {
    const result = await findAllUserInfoRepo();
    const listUsers = result.map((user) => ({
      userId: user[0],
      userName: user[1],
      fullName: user[2],
      email: user[3],
      phoneNumber: user[4],
    }));
    return listUsers;
  } catch (err) {
    throw new Error(err.message || "Error creating user");
  }
}

module.exports = {
  createUser,
  findAll,
  updateUser,
  deleteUser,
  findAllTableSpace,
  findAllUserName,
  findAllUserInfo,
};
