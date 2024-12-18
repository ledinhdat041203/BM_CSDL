const {
  createProfileRepo,
  updateProfileRepo,
  deleteProfileRepo,
  findAllProfileNameRepo,
  findAllProfileRepo,
  profileDetailRepo,
} = require("../data/profileRepository");

async function createProfile(profile) {
  try {
    const result = await createProfileRepo(profile);
    return result;
  } catch (err) {
    throw new Error(err.message || "Error creating user");
  }
}

async function updateprofile(profile) {
  try {
    const result = await updateProfileRepo(profile);
    return result;
  } catch (err) {
    throw new Error(err.message || "Error update user");
  }
}

async function deleteProfile(profileName) {
  try {
    const result = await deleteProfileRepo(profileName);
    return result;
  } catch (err) {
    throw new Error(err.message || "Error delete user");
  }
}

async function findAllProfileName() {
  try {
    const result = await findAllProfileNameRepo();
    const listProfile = result.map((profile) => profile[0]);
    return listProfile;
  } catch (err) {
    throw new Error(err.message || "Error delete user");
  }
}

async function findAllProfile() {
  try {
    const result = await findAllProfileRepo();
    const listProfile = result.map((profile) => ({
      PROFILE: profile[0],
      CONNECT_TIME: profile[1],
      IDLE_TIME: profile[2],
      SESSIONS_PER_USER: profile[3],
    }));
    return listProfile;
  } catch (err) {
    throw new Error(err.message || "Error delete user");
  }
}

async function profileDetail(profileName) {
  try {
    const result = await profileDetailRepo(profileName);
    const profile = result.map((profile) => ({
      PROFILE: profile[0],
      CONNECT_TIME: profile[1],
      IDLE_TIME: profile[2],
      SESSIONS_PER_USER: profile[3],
      PASSWORD_LIFE_TIME: profile[4],
      FAILED_LOGIN_ATTEMPTS: profile[5],
      PASSWORD_REUSE_MAX: profile[6],
      PASSWORD_VERIFY_FUNCTION: profile[7],
    }));
    return profile;
  } catch (err) {
    throw new Error(err.message || "Error delete user");
  }
}

module.exports = {
  createProfile,
  updateprofile,
  deleteProfile,
  findAllProfileName,
  findAllProfile,
  profileDetail,
};
