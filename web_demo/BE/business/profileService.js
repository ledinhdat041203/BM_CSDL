const {
  createProfileRepo,
  updateProfileRepo,
  deleteProfileRepo,
  findAllProfileNameRepo,
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

module.exports = {
  createProfile,
  updateprofile,
  deleteProfile,
  findAllProfileName,
};
