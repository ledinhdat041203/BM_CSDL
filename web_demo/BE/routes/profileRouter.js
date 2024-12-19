const express = require("express");
const Profile = require("../model/profileModel");
const {
  createProfile,
  updateprofile,
  deleteProfile,
  findAllProfileName,
  findAllProfile,
  profileDetail,
} = require("../business/profileService");
const router = express.Router();

router.post("/create", async (req, res) => {
  try {
    const {
      profileName,
      sessionPerUser,
      connectTime,
      idleTime,
      passLife,
      failLogin,
    } = req.body;
    if (!profileName) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const profile = new Profile({
      profileName,
      sessionPerUser,
      connectTime,
      idleTime,
      passLife,
      failLogin,
    });
    console.log("profile::", profile);

    const result = await createProfile(profile);

    res.status(201).json({
      success: true,
      message: "profile created successfully",
      data: result,
    });
  } catch (err) {
    res.status(500).json({ message: err.message || "Internal server error" });
  }
});

router.post("/update", async (req, res) => {
  try {
    const {
      profileName,
      sessionPerUser,
      connectTime,
      idleTime,
      passLife,
      failLogin,
    } = req.body;

    if (!profileName) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const profile = new Profile({
      profileName,
      sessionPerUser,
      connectTime,
      idleTime,
      passLife,
      failLogin,
    });

    const result = await updateprofile(profile);

    res.status(200).json({
      success: true,
      message: "profile updated successfully",
      data: result,
    });
  } catch (err) {
    res.status(500).json({ message: err.message || "Internal server error" });
  }
});

router.post("/delete", async (req, res) => {
  try {
    const { profileName } = req.query;
    console.log(profileName);

    const result = await deleteProfile(profileName);
    res.status(200).json({
      success: true,
      message: "Profile deleted successfully",
      data: result,
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
      data: result,
    });
  } catch (err) {
    res.status(500).json({ message: err.message || "Internal server error" });
  }
});

router.get("/find-all", async (req, res) => {
  try {
    const result = await findAllProfile();

    res.status(200).json({
      success: true,
      message: "successfully",
      data: result,
    });
  } catch (err) {
    res.status(500).json({ message: err.message || "Internal server error" });
  }
});

router.get("/detail", async (req, res) => {
  try {
    const { profileName } = req.query;
    const result = await profileDetail(profileName);

    res.status(200).json({
      success: true,
      message: "successfully",
      data: result,
    });
  } catch (err) {
    res.status(500).json({ message: err.message || "Internal server error" });
  }
});

module.exports = router;
