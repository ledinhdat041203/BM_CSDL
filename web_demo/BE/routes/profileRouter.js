const express = require("express");
const Profile = require("../model/profileModel");
const {
  createProfile,
  updateprofile,
  deleteProfile,
  findAllProfileName,
} = require("../business/profileService");
const router = express.Router();

router.post("/create", async (req, res) => {
  try {
    const { profileName, sessionPerUser, connectTime, idleTime } = req.body;

    if (!profileName) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const profile = new Profile({
      profileName,
      sessionPerUser,
      connectTime,
      idleTime,
    });

    const result = await createProfile(profile);

    res.status(201).json({
      success: true,
      message: "profile created successfully",
      user: result,
    });
  } catch (err) {
    res.status(500).json({ message: err.message || "Internal server error" });
  }
});

router.post("/update", async (req, res) => {
  try {
    const { profileName, sessionPerUser, connectTime, idleTime } = req.body;

    if (!profileName) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const profile = new Profile({
      profileName,
      sessionPerUser,
      connectTime,
      idleTime,
    });

    const result = await updateprofile(profile);

    res.status(200).json({
      success: true,
      message: "profile updated successfully",
      user: result,
    });
  } catch (err) {
    res.status(500).json({ message: err.message || "Internal server error" });
  }
});

router.post("/delete", async (req, res) => {
  try {
    const { profileName } = req.query;
    const result = await deleteProfile(profileName);

    res.status(200).json({
      success: true,
      message: "Profile deleted successfully",
      user: result,
    });
  } catch (err) {
    res.status(500).json({ message: err.message || "Internal server error" });
  }
});

router.get("/find-all-name", async (req, res) => {
  try {
    const result = await findAllProfileName();

    res.status(200).json({
      success: true,
      message: "successfully",
      user: result,
    });
  } catch (err) {
    res.status(500).json({ message: err.message || "Internal server error" });
  }
});

module.exports = router;
