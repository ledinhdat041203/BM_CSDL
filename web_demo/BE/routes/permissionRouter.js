const express = require("express");
const {
  grantSysPermission,
  grantObjectPermission,
  revokeSysPermission,
  revokeObjectPermission,
  findAllSysPermission,
  findAllObjPermission,
} = require("../business/permissionService");

const router = express.Router();

router.post("/grant-sys-permission", async (req, res) => {
  try {
    const { name, permission, grantOption = false } = req.body;

    if (!name | !permission) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const result = await grantSysPermission(name, permission, grantOption);

    res.status(200).json({
      success: true,
      message: "granted successfully",
      data: result,
    });
  } catch (err) {
    res.status(500).json({ message: err.message || "Internal server error" });
  }
});

router.post("/grant-obj-permission", async (req, res) => {
  try {
    const { name, permission, table, grantOption = false } = req.body;

    if (!name | !permission | !table) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const result = await grantObjectPermission(
      name,
      permission,
      table,
      grantOption
    );

    res.status(200).json({
      success: true,
      message: "granted successfully",
      data: result,
    });
  } catch (err) {
    res.status(500).json({ message: err.message || "Internal server error" });
  }
});

router.post("/revoke-sys-permission", async (req, res) => {
  try {
    const { name, permission } = req.body;

    if (!name | !permission) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const result = await revokeSysPermission(name, permission);

    res.status(200).json({
      success: true,
      message: "revoked successfully",
      data: result,
    });
  } catch (err) {
    res.status(500).json({ message: err.message || "Internal server error" });
  }
});

router.post("/revoke-obj-permission", async (req, res) => {
  try {
    const { name, permission, table } = req.body;

    if (!name | !permission | !table) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const result = await revokeObjectPermission(name, permission, table);

    res.status(200).json({
      success: true,
      message: "revoked successfully",
      data: result,
    });
  } catch (err) {
    res.status(500).json({ message: err.message || "Internal server error" });
  }
});

router.get("/find-all-sys-permission", async (req, res) => {
  try {
    const result = await findAllSysPermission();

    res.status(200).json({
      success: true,
      message: "successfully",
      listPermissioins: result,
    });
  } catch (err) {
    res.status(500).json({ message: err.message || "Internal server error" });
  }
});

router.get("/find-all-obj-permission", async (req, res) => {
  try {
    const result = await findAllObjPermission();

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
