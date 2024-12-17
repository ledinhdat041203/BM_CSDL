const express = require("express");
const router = express.Router();
const {
  createUser,
  findAll,
  updateUser,
  deleteUser,
} = require("../business/userService");
const User = require("../model/userModel");

router.post("/create", async (req, res) => {
  try {
    const {
      username,
      password,
      defaultTablespace,
      tempTablespace,
      quota,
      accountStatus,
      profile,
      role,
    } = req.body;

    if (!username || !password || !quota) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const user = new User({
      username,
      password,
      defaultTablespace,
      tempTablespace,
      quota,
      accountStatus,
      profile,
      role,
    });

    console.log("user:", user);

    const result = await createUser(user);

    res.status(201).json({
      success: true,
      message: "User created successfully",
      user: result,
    });
  } catch (err) {
    res.status(500).json({ message: err.message || "Internal server error" });
  }
});

router.post("/update", async (req, res) => {
  try {
    const {
      username,
      defaultTablespace,
      tempTablespace,
      quota,
      accountStatus,
      profile,
      role,
    } = req.body;

    const user = new User({
      username,
      defaultTablespace,
      tempTablespace,
      quota,
      accountStatus,
      profile,
      role,
    });
    console.log("user::", user);
    const result = await updateUser(user);

    res.status(201).json({
      success: true,
      message: "User updated successfully",
      user: result,
    });
  } catch (err) {
    res.status(500).json({ message: err.message || "Internal server error" });
  }
});

router.post("/delete", async (req, res) => {
  try {
    const { username } = req.query;
    console.log("user::", username);
    const result = await deleteUser(username);

    res.status(200).json({
      success: true,
      message: "User deleted successfully",
      user: result,
    });
  } catch (err) {
    res.status(500).json({ message: err.message || "Internal server error" });
  }
});

router.get("/find-all", async (req, res) => {
  try {
    const result = await findAll();

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
