const express = require("express");
const Role = require("../model/roleModel");
const {
  createRole,
  updateRole,
  deleteRole,
  findAllRole,
  findAllRoleName,
  findAllRoleAndUser,
  findRoleName,
} = require("../business/roleService");
const router = express.Router();

router.post("/create", async (req, res) => {
  try {
    const { roleName, password } = req.body;

    console.log("rolesss:::", req.body);

    if (!roleName) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const role = new Role({
      roleName,
      pass: password,
    });

    const result = await createRole(role);

    res.status(201).json({
      success: true,
      message: "role created successfully",
      data: result,
    });
  } catch (err) {
    res.status(500).json({ message: err.message || "Internal server error" });
  }
});

router.post("/update", async (req, res) => {
  try {
    const { roleName, password } = req.body;

    if (!roleName) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const role = new Role({
      roleName,
      pass: password,
    });

    console.log(role);

    const result = await updateRole(role);

    res.status(201).json({
      success: true,
      message: "role updated successfully",
      data: result,
    });
  } catch (err) {
    res.status(500).json({ message: err.message || "Internal server error" });
  }
});

router.post("/delete", async (req, res) => {
  try {
    const { roleName } = req.query;
    const result = await deleteRole(roleName);

    res.status(200).json({
      success: true,
      message: "Role deleted successfully",
      data: result,
    });
  } catch (err) {
    res.status(500).json({ message: err.message || "Internal server error" });
  }
});

router.get("/find-all", async (req, res) => {
  try {
    const result = await findAllRole();

    res.status(200).json({
      success: true,
      message: "successfully",
      data: result,
    });
  } catch (err) {
    res.status(500).json({ message: err.message || "Internal server error" });
  }
});

router.get("/find-all-role-user", async (req, res) => {
  try {
    const result = await findAllRoleAndUser();

    res.status(200).json({
      success: true,
      message: "successfully",
      data: result,
    });
  } catch (err) {
    res.status(500).json({ message: err.message || "Internal server error" });
  }
});

router.get("/find-all-name", async (req, res) => {
  try {
    const result = await findAllRoleName();

    res.status(200).json({
      success: true,
      message: "successfully",
      data: result,
    });
  } catch (err) {
    res.status(500).json({ message: err.message || "Internal server error" });
  }
});

router.get("/find-role-name", async (req, res) => {
  try {
    const result = await findRoleName();

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
